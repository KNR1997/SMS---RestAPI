package com.example.sms.service;

import com.example.sms.dto.Course.CourseStudentCountDTO;
import com.example.sms.dto.Student.GradeStudentCountDTO;
import com.example.sms.dto.Student.StudentCreateDTO;
import com.example.sms.dto.Student.StudentListDTO;
import com.example.sms.entity.*;
import com.example.sms.enums.RoleType;
import com.example.sms.exception.ResourceNotFoundException;
import com.example.sms.repository.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.Year;
import java.util.List;

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

    @Autowired
    private GuardianService guardianService;

    @Autowired
    private PaymentService paymentService;

    @Autowired
    private EnrollmentRepository enrollmentRepository;

    @Autowired
    private EnrollmentPaymentService enrollmentPaymentService;

    @Autowired
    private GuardianRepository guardianRepository;

    public Page<StudentListDTO> getStudentsPaginated(Pageable pageable, User currentUser) {
        Page<Student> studentPage;
        if (currentUser.isAdmin()) {
            studentPage = studentRepository.findAll(pageable);
        } else if (currentUser.getRole().getName().equals(RoleType.ROLE_TEACHER)) {
            User user = userRepository.findById(currentUser.getId())
                    .orElseThrow(() -> new ResourceNotFoundException("User not found"));

            List<Course> courses = courseRepository.findByTeacher(user);
            studentPage = enrollmentRepository.findDistinctStudentsByCourseIn(courses, pageable);
//            studentPage = studentRepository.findAll(pageable);
        } else {
            // fallback for other roles (optional)
            studentPage = studentRepository.findAll(pageable);
        }
        return studentPage.map(StudentListDTO::new);
    }

//    public Page<StudentListDTO> getStudentsPaginated(Pageable pageable) {
//        Page<Student> studentPage = studentRepository.findAll(pageable);
//        return studentPage.map(StudentListDTO::new);
//    }

    public Student getStudentById(Integer id) {
        return studentRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Student not found with id: " + id));
    }

    public Student getStudentByUser(User user) {
        return studentRepository.findByUser(user)
                .orElseThrow(() -> new ResourceNotFoundException("Student not found"));
    }

    @Transactional
    public Student createStudent(StudentCreateDTO studentCreateDTO) {

        // First create a User
        User newUser = userService.createUser(studentCreateDTO.getUserDetails());

        // Create a new Student
        Student student = new Student();
        student.setUser(newUser);
        student.setStudentId(generateStudentId());
        student.setDateOfBirth(studentCreateDTO.getDateOfBirth());
        student.setGradeType(studentCreateDTO.getGradeType());

        Guardian guardian;
        Integer guardianId = studentCreateDTO.getGuardianDetails().getId();
        if (guardianId == null) {
            // If no ID is provided, create a new guardian
            guardian = guardianService.createGuardian(studentCreateDTO.getGuardianDetails());
        } else {
            // Otherwise, fetch existing guardian
            guardian = guardianRepository.findById(guardianId)
                    .orElseThrow(() -> new ResourceNotFoundException("Guardian not found with ID: " + guardianId));
        }

        student.setGuardian(guardian);
        return studentRepository.save(student);
    }

    public Student updateStudent(Integer id, StudentCreateDTO studentCreateDTO) {
        Student student = studentRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Student not found with ID: " + id));

        User user = userRepository.findById(student.getUser().getId())
                .orElseThrow(() -> new ResourceNotFoundException("User not found with ID: " + id));

        user.setFirstName(studentCreateDTO.getUserDetails().getFirstName());
        user.setLastName(studentCreateDTO.getUserDetails().getLastName());
//        user.setEmail(studentCreateDTO.getUserDetails().getEmail());
        user.setGenderType(studentCreateDTO.getUserDetails().getGenderType());
        user.setAddress(studentCreateDTO.getUserDetails().getAddress());

        student.setDateOfBirth(studentCreateDTO.getDateOfBirth());
        student.setGradeType(studentCreateDTO.getGradeType());
//        student.setGuardianName(studentCreateDTO.getGuardianName());
//        student.setContactNumber(studentCreateDTO.getContactNumber());

        userRepository.save(user);
        return studentRepository.save(student);
    }

    public Student saveStudent(Student student) {
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

    public List<GradeStudentCountDTO> getStudentsCountInGrades() {
        return studentRepository.getGradeStudentCounts();
    }
}
