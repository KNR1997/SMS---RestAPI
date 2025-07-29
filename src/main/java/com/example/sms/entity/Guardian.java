package com.example.sms.entity;

import com.example.sms.enums.RelationshipType;
import jakarta.persistence.*;
import lombok.Data;

@Data
@Entity
public class Guardian {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;

    private String firstName;

    private String lastName;

    private String email;

    @Column(unique = true)
    private String nationalIdentityNumber;

    private String contactNumber;

    @Enumerated(EnumType.STRING)
    private RelationshipType relationship;

    @Column(name = "active")
    private boolean active = true;

}
