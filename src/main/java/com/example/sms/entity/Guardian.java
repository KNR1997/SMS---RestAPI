package com.example.sms.entity;

import jakarta.persistence.*;
import lombok.Data;

@Data
@Entity
public class Guardian {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;

//    @OneToOne
//    @JoinColumn(name = "user_id")
//    private User user;

    private String firstName;

    private String lastName;

    private String email;

    @Column(unique = true)
    private String nationalIdentityNumber;

    private String contactNumber;

}
