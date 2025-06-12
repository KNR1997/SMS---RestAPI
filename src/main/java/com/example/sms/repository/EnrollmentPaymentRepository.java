package com.example.sms.repository;

import com.example.sms.entity.EnrollmentPayment;
import org.springframework.data.jpa.repository.JpaRepository;

public interface EnrollmentPaymentRepository extends JpaRepository<EnrollmentPayment, Integer> {
}
