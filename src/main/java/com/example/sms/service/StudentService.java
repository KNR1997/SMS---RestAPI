package com.example.sms.service;

import com.example.sms.dto.Enrollment.EnrollmentCreateDTO;
import com.example.sms.dto.Student.StudentCreateDTO;
import com.example.sms.dto.Student.StudentListDTO;
import com.example.sms.dto.Student.StudentUpdateDTO;
import com.example.sms.dto.request.StudentCourseEnrollmentRequest;
import com.example.sms.entity.*;
import com.example.sms.exception.ResourceNotFoundException;
import com.example.sms.repository.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.Year;
import java.util.List;
import java.util.Set;
import java.util.stream.Collectors;

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
    private EnrollmentService enrollmentService;

    @Autowired
    private EnrollmentPaymentService enrollmentPaymentService;

    @Autowired
    private GuardianRepository guardianRepository;

    public Page<StudentListDTO> getStudentsPaginated(Pageable pageable) {
        Page<Student> studentPage = studentRepository.findAll(pageable);
        return studentPage.map(StudentListDTO::new);
    }

    public Student getStudentById(Integer id) {
        return studentRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Student not found with id: " + id));
    }

    @Transactional
    public Student createStudent(StudentCreateDTO studentCreateDTO) {

        User newUser = userService.createUser(studentCreateDTO.getUserDetails());

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
        user.setEmail(studentCreateDTO.getUserDetails().getEmail());

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

    @Transactional
    public void enrollStudentInCourses(Integer studentId, StudentCourseEnrollmentRequest request) {
        // Get the student
        Student student = studentRepository.findById(studentId)
                .orElseThrow(() -> new ResourceNotFoundException("Student not found with id: " + studentId));

        // Get the courses that going to enroll
        List<Course> coursesToEnroll = courseRepository.findAllById(request.getCourseIds());

        // Get all the existing enrollments for this student
        List<Enrollment> enrollments = enrollmentRepository.findByStudentId(studentId);

        // Get Courses list from that enrollments
        Set<Course> alreadyEnrolledCourses = enrollments.stream()
                .map(Enrollment::getCourse)
                .collect(Collectors.toSet());

        // Filter out already enrolled courses and create new enrollments
        for (Course course : coursesToEnroll) {
            if (alreadyEnrolledCourses.contains(course)) {
                continue; // skip if already enrolled
            }

            // Create new enrollment for courses not already enrolled
            Enrollment enrollment = enrollmentService.createEnrollment(new EnrollmentCreateDTO(student, course));
        }
    }

//    public Page<Course> getEnrolledCourses(Integer studentId, Pageable pageable, String search) {
//        if (search != null && !search.isEmpty()) {
//            return studentRepository.findCoursesByStudentIdAndSearch(studentId, search, pageable);
//        } else {
//            return studentRepository.findCoursesByStudentId(studentId, pageable);
//        }
//    }
}
