package com.example.sms.repository;

import com.example.sms.entity.PaymentItem;
import org.springframework.data.jpa.repository.JpaRepository;

public interface PaymentItemRepository extends JpaRepository<PaymentItem, Integer> {
}
