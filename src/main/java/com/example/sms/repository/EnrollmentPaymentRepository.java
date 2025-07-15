package com.example.sms.repository;

import com.example.sms.dto.Course.CoursePaymentSummary;
import com.example.sms.entity.Course;
import com.example.sms.entity.EnrollmentPayment;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface EnrollmentPaymentRepository extends JpaRepository<EnrollmentPayment, Integer> {
    List<EnrollmentPayment> findByEnrollmentId(Integer enrollmentId);
    Page<EnrollmentPayment> findByEnrollmentCourse(Course course, Pageable pageable);

    @Query(value = """
            SELECT 
                c.name as course_name, 
                c.fee as course_fee, 
                SUM(ep.amount) as income, 
                COUNT(ep.amount) as student_count, 
                ep.month_number as month_number
            FROM enrollment_payment ep
            JOIN enrollment e ON ep.enrollment_id = e.id 
            JOIN course c ON c.id = e.course_id
            WHERE ep.month_number = :monthNumber AND c.teacher_id = :teacherId
            GROUP BY c.name, ep.month_number, c.fee
            """, nativeQuery = true)
    List<CoursePaymentSummary> getStudentCoursePayments(
            @Param("monthNumber") int monthNumber,
            @Param("teacherId") Long teacherId
    );

}
