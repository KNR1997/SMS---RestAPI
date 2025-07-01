package com.example.sms.service;

import com.example.sms.dto.Payment.PaymentCreateDTO;
import com.example.sms.dto.Payment.PaymentItemCreateDTO;
import com.example.sms.dto.Payment.PaymentListDTO;
import com.example.sms.entity.Event;
import com.example.sms.entity.Payment;
import com.example.sms.enums.PaymentStatusType;
import com.example.sms.exception.ResourceNotFoundException;
import com.example.sms.repository.PaymentRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;

@Service
public class PaymentService {

    @Autowired
    private PaymentRepository paymentRepository;

    @Autowired
    private PaymentItemService paymentItemService;

    public Page<PaymentListDTO> getPaymentsPaginated(Pageable pageable) {
        Page<Payment> paymentPage = paymentRepository.findAll(pageable);
        return paymentPage.map(PaymentListDTO::new);
    }

    public Payment getById(Integer id) {
        return paymentRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Payment not found"));
    }

    @Transactional
    public Payment createPayment(PaymentCreateDTO createDto) {

        Payment payment = new Payment();
        payment.setPayerType(createDto.getPayerType());
        payment.setPayerId(createDto.getPayerId());
        payment.setPayeeType(createDto.getPayeeType());
        payment.setPayeeId(createDto.getPayeeId());
        payment.setTotalAmount(createDto.getTotalAmount());
        payment.setPaymentDate(LocalDateTime.now());
        payment.setPaymentMethod(createDto.getPaymentMethod());
        payment.setReferenceNumber(createDto.getReferenceNumber());
        payment.setStatus(PaymentStatusType.COMPLETED);

//        for (PaymentItemCreateDTO paymentItemCreateDTO : createDto.getPaymentItemCreateDTOList()) {
//            paymentItemService.createPaymentItem(paymentItemCreateDTO);
//        }

        return paymentRepository.save(payment);
    }
}
