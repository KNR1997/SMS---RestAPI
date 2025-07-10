package com.example.sms.controller;

import com.example.sms.dto.Report.InstituteMonthlyIncomeDTO;
import com.example.sms.entity.PaymentItem;
import com.example.sms.service.PaymentItemService;
import com.example.sms.service.ReportService;
import io.swagger.v3.oas.annotations.security.SecurityRequirement;
import jakarta.servlet.http.HttpServletResponse;
import org.apache.poi.hssf.usermodel.HSSFRow;
import org.apache.poi.hssf.usermodel.HSSFSheet;
import org.apache.poi.hssf.usermodel.HSSFWorkbook;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.io.IOException;
import java.time.format.DateTimeFormatter;
import java.util.List;

@RestController
@CrossOrigin
@RequestMapping("/api/reports")
@SecurityRequirement(name = "bearerAuth")
public class ReportController {

    @Autowired
    private ReportService reportService;

    @Autowired
    private PaymentItemService paymentItemService;

    @GetMapping("/institute-monthly-income")
    public List<InstituteMonthlyIncomeDTO> getInstituteMonthlyIncome() {
        return reportService.getInstituteMonthlyIncome();
    }

    @GetMapping("/export/institute-monthly-income")
    public void exportInstituteMonthlyIncomeToExcel(HttpServletResponse response) throws IOException {

        List<PaymentItem> paymentItems = paymentItemService.getAll();

        // Create Excel workbook
        HSSFWorkbook workbook = new HSSFWorkbook();
        HSSFSheet sheet = workbook.createSheet("Invoices");

        // Header row
        HSSFRow headerRow = sheet.createRow(0);
        headerRow.createCell(0).setCellValue("ID");
        headerRow.createCell(1).setCellValue("Payment Type");
        headerRow.createCell(2).setCellValue("Payment Method");
        headerRow.createCell(3).setCellValue("Description");
        headerRow.createCell(4).setCellValue("Amount");
        headerRow.createCell(5).setCellValue("Payment Date");
        // Add more fields based on your DTO

        // Data rows
        DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyy-MM-dd");
        int rowNum = 1;
        for (PaymentItem paymentItem : paymentItems) {
            HSSFRow row = sheet.createRow(rowNum++);
            row.createCell(0).setCellValue(paymentItem.getId());
            row.createCell(1).setCellValue(paymentItem.getPaymentType().toString()); // Replace with your actual fields
            row.createCell(2).setCellValue(paymentItem.getPayment().getPaymentMethod().toString());
            row.createCell(3).setCellValue(paymentItem.getDescription());
            row.createCell(4).setCellValue(paymentItem.getAmount());
            row.createCell(5).setCellValue(paymentItem.getPayment().getPaymentDate().format(formatter));
        }

        // Set response headers
        response.setContentType("application/vnd.ms-excel");
        response.setHeader("Content-Disposition", "attachment; filename=institute_income.xls");

        workbook.write(response.getOutputStream());
        workbook.close();
    }
}
