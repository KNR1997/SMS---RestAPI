package com.example.sms.repository;

import com.example.sms.entity.EnrollmentPayment;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface EnrollmentPaymentRepository extends JpaRepository<EnrollmentPayment, Integer> {
    List<EnrollmentPayment> findByEnrollmentId(Integer enrollmentId);

}
