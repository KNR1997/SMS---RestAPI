package com.example.sms.service;

import com.example.sms.dto.EnrollmentPayment.EnrollmentPaymentCreateDTO;
import com.example.sms.entity.EnrollmentPayment;
import com.example.sms.repository.EnrollmentPaymentRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class EnrollmentPaymentService {

    @Autowired
    private EnrollmentPaymentRepository enrollmentPaymentRepository;

    public EnrollmentPayment createEnrollmentPayment(EnrollmentPaymentCreateDTO createDTO) {

        EnrollmentPayment enrollmentPayment = new EnrollmentPayment();
        enrollmentPayment.setEnrollment(createDTO.getEnrollment());
        enrollmentPayment.setMonthNumber(createDTO.getMonthNumber());
        enrollmentPayment.setAmount(createDTO.getAmount());
        enrollmentPayment.setPaymentDateToToday();
        enrollmentPayment.setPayment(createDTO.getPayment());

        return enrollmentPaymentRepository.save(enrollmentPayment);
    }
}
