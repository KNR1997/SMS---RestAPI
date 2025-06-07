package com.example.sms.service;

import com.example.sms.dto.Payment.PaymentCreateDTO;
import com.example.sms.dto.Payment.PaymentListDTO;
import com.example.sms.entity.Course;
import com.example.sms.entity.Payment;
import com.example.sms.entity.User;
import com.example.sms.exception.ResourceNotFoundException;
import com.example.sms.repository.CourseRepository;
import com.example.sms.repository.PaymentRepository;
import com.example.sms.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Set;

@Service
public class PaymentService {

    @Autowired
    private PaymentRepository paymentRepository;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private CourseRepository courseRepository;

    public Page<PaymentListDTO> getPaymentsPaginated(Pageable pageable) {
        Page<Payment> paymentPage = paymentRepository.findAll(pageable);
        return paymentPage.map(PaymentListDTO::new);
    }

    public Payment createPayment(PaymentCreateDTO createDto) {
        User student = userRepository.findById(createDto.getStudentId())
                .orElseThrow(() -> new ResourceNotFoundException("User not found with id: " + createDto.getStudentId()));

        List<Course> paymentCourses  = courseRepository.findAllById(createDto.getCourses());

        Payment payment = new Payment();
        payment.setPaymentType(createDto.getPaymentType());
        payment.setAdmission(createDto.getAdmission());
        payment.setStudent(student);
        payment.setTotal(createDto.getTotal());

        Set<Course> courses = payment.getCourses();
        courses.addAll(paymentCourses);

        return paymentRepository.save(payment);
    }
}
