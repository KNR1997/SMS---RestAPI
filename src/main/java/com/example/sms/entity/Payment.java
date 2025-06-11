package com.example.sms.entity;

import jakarta.persistence.*;
import lombok.Data;

import java.util.HashSet;
import java.util.Set;

@Data
@Entity
public class Payment {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "student_id", nullable = false)
    private Student student;

//    @ManyToMany(fetch = FetchType.LAZY)
//    @JoinTable(name = "payment_courses",
//            joinColumns = @JoinColumn(name = "payment_id"),
//            inverseJoinColumns = @JoinColumn(name = "course_id"))
//    private Set<Course> courses = new HashSet<>();

    @Enumerated(EnumType.STRING)
    private EPayment paymentType;

    private Double admission;

    private Double total;
}
