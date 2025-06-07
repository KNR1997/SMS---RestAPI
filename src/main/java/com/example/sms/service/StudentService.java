package com.example.sms.service;

import com.example.sms.dto.Course.CourseListDTO;
import com.example.sms.dto.EnrollCourseDTO;
import com.example.sms.dto.Student.StudentCreateDTO;
import com.example.sms.dto.Student.StudentListDTO;
import com.example.sms.entity.Course;
import com.example.sms.entity.Grade;
import com.example.sms.entity.Student;
import com.example.sms.entity.User;
import com.example.sms.exception.BadRequestException;
import com.example.sms.exception.ResourceNotFoundException;
import com.example.sms.repository.CourseRepository;
import com.example.sms.repository.StudentRepository;
import com.example.sms.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.time.Year;
import java.util.List;
import java.util.Set;

@Service
public class StudentService {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private StudentRepository studentRepository;

    @Autowired
    private UserService userService;

    @Autowired
    private CourseRepository courseRepository;

    public Page<StudentListDTO> getStudentsPaginated(Pageable pageable) {
        Page<Student> studentPage = studentRepository.findAll(pageable);
        return studentPage.map(StudentListDTO::new);
    }

    public Student getStudentById(Integer id) {
        return studentRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Student not found with id: " + id));
    }

    public Student createStudent(StudentCreateDTO studentCreateDTO) {

        User newUser = userService.createUser(studentCreateDTO.getUserDetails());

        Student student = new Student();
        student.setUser(newUser);
        student.setStudentId(generateStudentId());
        student.setDateOfBirth(studentCreateDTO.getDateOfBirth());
        student.setGrade(studentCreateDTO.getGrade());
        student.setGuardianName(studentCreateDTO.getGuardianName());
        student.setContactNumber(studentCreateDTO.getContactNumber());

        return studentRepository.save(student);
    }

    public Student updateStudent(Integer id, StudentCreateDTO studentCreateDTO) {
        Student student = studentRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Student not found with ID: " + id));

        User user = userRepository.findById(student.getUser().getId())
                .orElseThrow(() -> new ResourceNotFoundException("User not found with ID: " + id));

        user.setFirstName(studentCreateDTO.getUserDetails().getFirstName());
        user.setLastName(studentCreateDTO.getUserDetails().getLastName());
        user.setEmail(studentCreateDTO.getUserDetails().getEmail());

        student.setDateOfBirth(studentCreateDTO.getDateOfBirth());
        student.setGrade(studentCreateDTO.getGrade());
        student.setGuardianName(studentCreateDTO.getGuardianName());
        student.setContactNumber(studentCreateDTO.getContactNumber());

        userRepository.save(user);
        return studentRepository.save(student);
    }

    private String generateStudentId() {
        String year = String.valueOf(Year.now().getValue()); // e.g., "2025"

        // Find the latest ID for the current year
        String maxId = studentRepository.findMaxStudentIdByYear(year);

        int nextSequence = 1; // Default if no records exist for the year

        if (maxId != null) {
            // Extract the numeric part (e.g., "001" from "ST/2025/001")
            String[] parts = maxId.split("/");
            String lastSeqStr = parts[2];
            nextSequence = Integer.parseInt(lastSeqStr) + 1;
        }

        // Format with leading zeros (e.g., 1 → "001")
        String sequencePart = String.format("%03d", nextSequence);

        return "ST/" + year + "/" + sequencePart;
    }

    public void enrollStudentInCourse(Integer studentId, EnrollCourseDTO enrollCourseDTO) {
        // 1. Find the student
        Student student = studentRepository.findById(studentId)
                .orElseThrow(() -> new ResourceNotFoundException("Student not found with id: " + studentId));

        // 2. Find the course
        List<Course> coursesToEnroll  = courseRepository.findAllById(enrollCourseDTO.getCourses());

        // 3. Filter out already enrolled courses
        Set<Course> alreadyEnrolled = student.getCourses();
        for (Course course : coursesToEnroll) {
            if (alreadyEnrolled.contains(course)) {
                continue; // skip if already enrolled
            }
            alreadyEnrolled.add(course); // enroll in new course
        }

        // 4. Save updated student
        studentRepository.save(student); // @Transactional ensures this is persisted
    }

    public Page<Course> getEnrolledCourses(Integer studentId, Pageable pageable, String search) {
        if (search != null && !search.isEmpty()) {
            return studentRepository.findCoursesByStudentIdAndSearch(studentId, search, pageable);
        } else {
            return studentRepository.findCoursesByStudentId(studentId, pageable);
        }
    }
}
