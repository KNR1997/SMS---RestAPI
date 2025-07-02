package com.example.sms.repository;

import com.example.sms.dto.Report.InstituteMonthlyIncomeDTO;
import com.example.sms.dto.Student.GradeStudentCountDTO;
import com.example.sms.entity.Payment;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface PaymentRepository extends JpaRepository<Payment, Integer> {

    @Query("SELECT YEAR(p.paymentDate) AS year, MONTH(p.paymentDate) AS month, SUM(p.totalAmount) AS totalIncome " +
            "FROM Payment p " +
            "WHERE p.payeeType = 'INSTITUTE' " +
            "GROUP BY YEAR(p.paymentDate), MONTH(p.paymentDate) " +
            "ORDER BY YEAR(p.paymentDate), MONTH(p.paymentDate)")
    List<InstituteMonthlyIncomeDTO> getInstituteMonthlyIncome();

}
