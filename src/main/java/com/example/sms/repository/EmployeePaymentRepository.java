package com.example.sms.repository;

import com.example.sms.entity.EmployeePayment;
import com.example.sms.entity.User;
import com.example.sms.enums.RoleType;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

public interface EmployeePaymentRepository extends JpaRepository<EmployeePayment, Integer> {

    boolean existsByEmployeeAndMonthNumber(User employee, Integer monthNumber);

    Page<EmployeePayment> findByEmployeeId(Integer employeeId, Pageable pageable);

    boolean existsByEmployee(User employee);

    @Query("SELECT ep FROM EmployeePayment ep " +
            "JOIN ep.employee e " +
            "WHERE (:name IS NULL OR LOWER(e.firstName) LIKE LOWER(CONCAT('%', :name, '%'))) " +
            "AND (:role IS NULL OR e.role.name = :role)")
    Page<EmployeePayment> searchPayment(
            @Param("name") String name,
            @Param("role") RoleType role,
            Pageable pageable
    );

}
