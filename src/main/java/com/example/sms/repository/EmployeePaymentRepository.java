package com.example.sms.repository;

import com.example.sms.entity.EmployeePayment;
import com.example.sms.entity.User;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;

public interface EmployeePaymentRepository extends JpaRepository<EmployeePayment, Integer> {

    boolean existsByEmployeeAndMonthNumber(User employee, Integer monthNumber);

    Page<EmployeePayment> findByEmployeeId(Integer employeeId, Pageable pageable);

    boolean existsByEmployee(User employee);

}
