package com.example.sms.entity;

import com.example.sms.enums.ExamStatusType;
import jakarta.persistence.*;
import lombok.Data;

@Data
@Entity
public class Exam {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;

    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "course_id", nullable = true)
    private Course course;

    private Integer capacity;

    @Enumerated(EnumType.STRING)
    private ExamStatusType status = ExamStatusType.PENDING;

    @Column(name = "active")
    private boolean active = true;
}
