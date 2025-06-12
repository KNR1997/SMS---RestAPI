package com.example.sms.entity;

import com.example.sms.enums.EnrollmentStatusType;
import jakarta.persistence.*;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;

@Entity
@Data
@NoArgsConstructor
public class Enrollment {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;

    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "student_id", nullable = true)
    private Student student;

    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "course_id", nullable = true)
    private Course course;

    private LocalDate enrollmentDate;

    @Enumerated(EnumType.STRING)
    private EnrollmentStatusType status = EnrollmentStatusType.LOCKED;

    private Integer currentMonth = 1;

    private Integer lastPaidMonth = 0;

    public void setEnrollmentDateToToday() {
        this.enrollmentDate = LocalDate.now();
    }

    public void setCurrentMonthToNow() {
        this.currentMonth = LocalDate.now().getMonthValue(); // returns 1-12
    }

}
