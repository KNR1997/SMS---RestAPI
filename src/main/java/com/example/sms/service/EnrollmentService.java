package com.example.sms.service;

import com.example.sms.dto.Enrollment.EnrollmentCreateDTO;
import com.example.sms.dto.Enrollment.EnrollmentListDTO;
import com.example.sms.entity.*;
import com.example.sms.enums.EnrollmentStatusType;
import com.example.sms.enums.RoleType;
import com.example.sms.exception.ResourceNotFoundException;
import com.example.sms.repository.CourseRepository;
import com.example.sms.repository.EnrollmentRepository;
import com.example.sms.repository.StudentRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class EnrollmentService {

    @Autowired
    private EnrollmentRepository enrollmentRepository;

    @Autowired
    private StudentRepository studentRepository;

    @Autowired
    private CourseRepository courseRepository;

    @Autowired
    private EnrollmentPaymentService enrollmentPaymentService;

    @Autowired
    private StudentService studentService;

    public Page<EnrollmentListDTO> getEnrollmentsPaginated(
            Pageable pageable,
            String search,
            String grade,
            User currentUser
    ) {
        Page<Enrollment> enrollmentPage = null;
        if (currentUser.isAdmin()) {
            enrollmentPage = enrollmentRepository.findAll(pageable);
        } else if (currentUser.getRole().getName().equals(RoleType.ROLE_STUDENT)) {
            Student student = studentService.getStudentByUser(currentUser);
            enrollmentPage = enrollmentRepository.findByStudentId(student.getId(), pageable);
        }
        assert enrollmentPage != null;
        return enrollmentPage.map(EnrollmentListDTO::new);
    }

    public Enrollment createEnrollment(EnrollmentCreateDTO createDTO) {

        // Use provided student if available, otherwise fetch by ID
        Student student = createDTO.getStudent() != null
                ? createDTO.getStudent()
                : studentRepository.findById(createDTO.getStudentId())
                .orElseThrow(() -> new ResourceNotFoundException("Student not found with ID: " + createDTO.getStudentId()));

        // Use provided course if available, otherwise fetch by ID
        Course course = createDTO.getCourse() != null
                ? createDTO.getCourse()
                : courseRepository.findById(createDTO.getCourseId())
                .orElseThrow(() -> new ResourceNotFoundException("Course not found with ID: " + createDTO.getCourseId()));

        Enrollment enrollment = new Enrollment();
        enrollment.setStudent(student);
        enrollment.setCourse(course);
        enrollment.setEnrollmentDateToToday();
        enrollment.setStatus(EnrollmentStatusType.LOCKED);
        enrollment.setCurrentMonthToNow();

        return enrollmentRepository.save(enrollment);
    }

    public Enrollment getEnrollmentById(Integer id) {
        return enrollmentRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Enrollment not found with id: " + id));
    }

    public Enrollment getEnrollmentsByStudentAndCourse(Student student, Course course) {
        return enrollmentRepository.findByStudentAndCourse(student, course);
    }

    public Enrollment saveEnrollment(Enrollment enrollment) {
        return enrollmentRepository.save(enrollment);
    }

    public Enrollment invokeEnrollment(Enrollment enrollment) {
        List<EnrollmentPayment> enrollments = enrollmentPaymentService.getAllByEnrollment(enrollment);

        for (EnrollmentPayment enrollmentPayment : enrollments) {
            if (enrollmentPayment.getMonthNumber() > enrollment.getCurrentMonth()) {
                enrollment.setStatus(EnrollmentStatusType.ACTIVE);
                return saveEnrollment(enrollment);
            }
        }

        return enrollment;
    }

}
