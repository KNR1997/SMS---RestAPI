package com.example.sms.service;

import com.example.sms.dto.Payment.PaymentItemCreateDTO;
import com.example.sms.entity.PaymentItem;
import com.example.sms.entity.Student;
import com.example.sms.enums.PaymentType;
import com.example.sms.exception.ResourceNotFoundException;
import com.example.sms.repository.PaymentItemRepository;
import com.example.sms.repository.StudentRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
public class PaymentItemService {

    @Autowired
    private PaymentItemRepository paymentItemRepository;

    @Autowired
    private StudentRepository studentRepository;

    @Transactional
    public PaymentItem createPaymentItem(PaymentItemCreateDTO createDto) {

        PaymentType paymentType = createDto.getPaymentType();

        PaymentItem paymentItem = new PaymentItem();
        paymentItem.setPayment(createDto.getPayment());
        paymentItem.setPaymentType(createDto.getPaymentType());
        paymentItem.setAmount(createDto.getAmount());
        paymentItem.setDescription(createDto.getDescription());

        if (paymentType == PaymentType.ADMISSION_FEE) {
            Integer studentId = createDto.getPayment().getPayerId();
            Student student = studentRepository.findById(studentId)
                    .orElseThrow(() -> new ResourceNotFoundException("Student not found with ID: " + studentId));
            student.setAdmissionPayed(true);
        } else if (paymentType == PaymentType.COURSE_FEE) {

        }

        return paymentItemRepository.save(paymentItem);
    }
}
