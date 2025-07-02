package com.example.sms.controller;

import com.example.sms.dto.Report.InstituteMonthlyIncomeDTO;
import com.example.sms.service.ReportService;
import io.swagger.v3.oas.annotations.security.SecurityRequirement;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@CrossOrigin
@RequestMapping("/api/reports")
@SecurityRequirement(name = "bearerAuth")
public class ReportController {

    @Autowired
    private ReportService reportService;

    @GetMapping("/institute-monthly-income")
    public List<InstituteMonthlyIncomeDTO> getInstituteMonthlyIncome() {
        return reportService.getInstituteMonthlyIncome();
    }
}
