package com.example.sms.entity;

import com.example.sms.enums.GradeType;
import jakarta.persistence.*;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Data
@NoArgsConstructor
public class Course {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;

    private String name; // Todo -> ENG GR8 RW B1 (auto suggest)

    @Column(unique = true)
    private String slug;

    @Column(unique = true)
    private String code;  // Todo -> MAT10RWB1, SIN, SCI10IPB2 (auto suggest)

    @Enumerated(EnumType.STRING)
    private GradeType gradeType;

    private Integer batch;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "subject_id", nullable = false)
    private Subject subject;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "teacher_id", nullable = false)
    private User teacher;

    private Double fee;

    private String description;

    @Column(name = "active")
    private boolean active = true;

}
