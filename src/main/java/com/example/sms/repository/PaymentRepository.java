package com.example.sms.repository;

import com.example.sms.dto.Payment.PaymentUserView;
import com.example.sms.dto.Report.InstituteMonthlyIncomeDTO;
import com.example.sms.dto.Student.GradeStudentCountDTO;
import com.example.sms.entity.Payment;
import com.example.sms.entity.User;
import com.example.sms.enums.RoleType;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface PaymentRepository extends JpaRepository<Payment, Integer> {

    @Query("SELECT YEAR(p.paymentDate) AS year, MONTH(p.paymentDate) AS month, SUM(p.totalAmount) AS totalIncome " +
            "FROM Payment p " +
            "WHERE p.payeeType = 'INSTITUTE' " +
            "GROUP BY YEAR(p.paymentDate), MONTH(p.paymentDate) " +
            "ORDER BY YEAR(p.paymentDate), MONTH(p.paymentDate)")
    List<InstituteMonthlyIncomeDTO> getInstituteMonthlyIncome();

    @Query("SELECT p.id AS paymentId, p.totalAmount AS paymentAmount, p.paymentDate as paymentDate, u.firstName AS firstName, u.lastName AS lastName " +
            "FROM Payment p " +
            "JOIN User u ON u.id = p.payerId " +
            "WHERE (:name IS NULL OR LOWER(u.firstName) LIKE LOWER(CONCAT('%', :name, '%'))) ")
    Page<PaymentUserView> searchPayment(
            @Param("name") String name,
            @Param("payerType") String payerType,
            Pageable pageable
    );

}
