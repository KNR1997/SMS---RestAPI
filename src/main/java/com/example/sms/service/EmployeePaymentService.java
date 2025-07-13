package com.example.sms.service;

import com.example.sms.dto.EmployeePayment.EmployeePaymentCreateDTO;
import com.example.sms.dto.Payment.PaymentCreateDTO;
import com.example.sms.entity.EmployeePayment;
import com.example.sms.entity.Payment;
import com.example.sms.entity.User;
import com.example.sms.enums.PayerType;
import com.example.sms.enums.PaymentMethod;
import com.example.sms.exception.ResourceNotFoundException;
import com.example.sms.repository.EmployeePaymentRepository;
import com.example.sms.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
public class EmployeePaymentService {

    @Autowired
    private PaymentService paymentService;

    @Autowired
    private EmployeePaymentRepository employeePaymentRepository;

    @Autowired
    private UserRepository userRepository;

//    @Transactional
//    public EmployeePayment createEmployeePayment(EmployeePaymentCreateDTO createDTO) {
//
//        User user = userRepository.findById(createDTO.getEmployeeId())
//                .orElseThrow(() -> new ResourceNotFoundException("User not found with id: " + createDTO.getEmployeeId()));
//
//        boolean alreadyPayedForMonth = employeePaymentRepository.existsByEmployeeAndMonthNumber(user, createDTO.getMonthNumber());
//
//        if (alreadyPayedForMonth) {
//            throw new IllegalStateException("Payment already exists for this employee and month.");
//        }
//
//        Payment payment = paymentService.createPayment(new PaymentCreateDTO(
//                PayerType.INSTITUTE,
//                0,
//                PayerType.TEACHER,
//                createDTO.getEmployeeId(),
//                createDTO.getAmount(),
//                PaymentMethod.CASH,
//                null
//        ));
//
//        EmployeePayment employeePayment = new EmployeePayment();
//        employeePayment.setEmployee(user);
//        employeePayment.setMonthNumber(createDTO.getMonthNumber());
//        employeePayment.setAmount(createDTO.getAmount());
//        employeePayment.setPaymentDateToToday();
//        employeePayment.setPayment(payment);
//
//        return employeePaymentRepository.save(employeePayment);
//    }
}
