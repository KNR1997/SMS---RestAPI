package com.example.sms.service;

import com.example.sms.dto.CreateStudentDTO;
import com.example.sms.entity.Course;
import com.example.sms.entity.Student;
import com.example.sms.entity.User;
import com.example.sms.exception.ResourceNotFoundException;
import com.example.sms.repository.CourseRepository;
import com.example.sms.repository.StudentRepository;
import com.example.sms.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.time.Year;

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

    public Page<Student> getAllStudents(Pageable pageable) {
        return studentRepository.findAll(pageable);
    }

    public Student getStudentById(Integer id) {
        return studentRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Student not found with id: " + id));
    }

    public Student createStudent(CreateStudentDTO createStudentDTO) {

        User newUser = userService.createUser(createStudentDTO.getUserDetails());

        Student student = new Student();
        student.setUser(newUser);
        student.setStudentId(generateStudentId());
        student.setDateOfBirth(createStudentDTO.getDateOfBirth());
        student.setGrade(createStudentDTO.getGrade());
        student.setGuardianName(createStudentDTO.getGuardianName());
        student.setContactNumber(createStudentDTO.getContactNumber());

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

    public void enrollStudentInCourse(Integer studentId, Integer courseId) {
        // 1. Find the student
        Student student = studentRepository.findById(studentId)
                .orElseThrow(() -> new ResourceNotFoundException("Student not found with id: " + studentId));

        // 2. Find the course
        Course course = courseRepository.findById(courseId)
                .orElseThrow(() -> new ResourceNotFoundException("Course not found with id: " + courseId));

        // 3. Check if already enrolled
        if (student.getCourses().contains(course)) {
            throw new IllegalStateException("Student is already enrolled in this course");
        }

        // 4. Enroll the student
        student.getCourses().add(course);
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
