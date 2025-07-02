package com.example.sms.service;

import com.example.sms.dto.Report.InstituteMonthlyIncomeDTO;
import com.example.sms.repository.PaymentRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ReportService {
    @Autowired
    private PaymentRepository paymentRepository;

    public List<InstituteMonthlyIncomeDTO> getInstituteMonthlyIncome() {
        return paymentRepository.getInstituteMonthlyIncome();
    }
}
