package com.example.sms.entity;

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
    private Grade grade;

    private Boolean admissionPayed = false;

//    @ManyToMany(fetch = FetchType.EAGER)
//    @JoinTable(name = "student_courses",
//            joinColumns = @JoinColumn(name = "student_id"),
//            inverseJoinColumns = @JoinColumn(name = "course_id"))
//    private Set<Course> courses = new HashSet<>();

    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "guardian_id", nullable = true)
    private Guardian guardian;

    public String getStudentName() {
        return user.getFirstName() + " "  + user.getLastName();
    }

}
