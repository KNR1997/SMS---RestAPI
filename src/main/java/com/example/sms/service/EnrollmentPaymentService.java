package com.example.sms.service;

import com.example.sms.dto.Course.CoursePaymentSummary;
import com.example.sms.dto.EnrollmentPayment.EnrollmentPaymentCreateDTO;
import com.example.sms.dto.EnrollmentPayment.EnrollmentPaymentDTO;
import com.example.sms.entity.Course;
import com.example.sms.entity.Enrollment;
import com.example.sms.entity.EnrollmentPayment;
import com.example.sms.exception.ResourceNotFoundException;
import com.example.sms.repository.CourseRepository;
import com.example.sms.repository.EnrollmentPaymentRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class EnrollmentPaymentService {

    @Autowired
    private EnrollmentPaymentRepository enrollmentPaymentRepository;

    @Autowired
    private CourseRepository courseRepository;

    public EnrollmentPayment createEnrollmentPayment(EnrollmentPaymentCreateDTO createDTO) {

        EnrollmentPayment enrollmentPayment = new EnrollmentPayment();
        enrollmentPayment.setEnrollment(createDTO.getEnrollment());
        enrollmentPayment.setMonthNumber(createDTO.getMonthNumber());
        enrollmentPayment.setAmount(createDTO.getAmount());
        enrollmentPayment.setPaymentDateToToday();
        enrollmentPayment.setPayment(createDTO.getPayment());

        return enrollmentPaymentRepository.save(enrollmentPayment);
    }

    public List<EnrollmentPayment> getAllByEnrollment(Enrollment enrollment) {
        return enrollmentPaymentRepository.findByEnrollmentId(enrollment.getId());
    }

    public Page<EnrollmentPaymentDTO> getEnrollmentPaymentsByCoursePaginated(
            Pageable pageable,
            Integer courseId
    ) {
        Course course = courseRepository.findById(courseId)
                .orElseThrow(() -> new ResourceNotFoundException("Course not found with id: " + courseId));

        Page<EnrollmentPayment> enrollmentPayments = enrollmentPaymentRepository.findByEnrollmentCourse(course, pageable);
        return enrollmentPayments.map(EnrollmentPaymentDTO::new);
    }

    public List<CoursePaymentSummary> getCoursePayments(int monthNumber, Long teacherId) {
        return enrollmentPaymentRepository.getStudentCoursePayments(monthNumber, teacherId);
    }
}
