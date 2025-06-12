package com.example.sms.entity;

import com.example.sms.enums.GradeType;
import jakarta.persistence.*;
import lombok.Data;

import java.util.Date;

@Data
@Entity
public class Student {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;

    @OneToOne
    @JoinColumn(name = "user_id")
    private User user;

    private String studentId;

    private Date dateOfBirth;

    @Enumerated(EnumType.STRING)
    private GradeType gradeType;

    private Boolean admissionPayed = false;

    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "guardian_id", nullable = true)
    private Guardian guardian;

    public String getStudentName() {
        return user.getFirstName() + " "  + user.getLastName();
    }

}
