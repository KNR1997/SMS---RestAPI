package com.example.sms.entity;

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

    @Column(unique = true)
    private String email;

    private String username;

    private String password;

    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "role_id", nullable = false)
    private Role role;

    public boolean isAdmin() {
        RoleType roleType =  role.getName();
        return roleType.equals(RoleType.ROLE_ADMIN);
    }

}
