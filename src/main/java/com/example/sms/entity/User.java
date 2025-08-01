package com.example.sms.entity;

import com.example.sms.enums.GenderType;
import com.example.sms.enums.GradeType;
import com.example.sms.enums.RoleType;
import jakarta.persistence.*;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Data
@NoArgsConstructor
public class User {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;

    private String firstName;

    private String lastName;

    @Enumerated(EnumType.STRING)
    private GenderType genderType;

    private String address;

    private String email;

    private String username;

    private String password;

    private String nic;

    private String phoneNumber;

    @Column(name = "active")
    private boolean active = true;

    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "role_id", nullable = false)
    private Role role;

    public boolean isAdmin() {
        RoleType roleType =  role.getName();
        return roleType.equals(RoleType.ROLE_ADMIN);
    }

    public String getUserFullName() {
        return this.getFirstName() + " "  + this.getLastName();
    }


}
