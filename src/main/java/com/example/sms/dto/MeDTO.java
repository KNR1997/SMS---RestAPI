package com.example.sms.dto;

import com.example.sms.entity.ERole;
import lombok.Data;

import java.util.Set;

@Data
public class MeDTO {
    private String userName;


    private String email;

    private Set<ERole> roles;

    public MeDTO(String userName, String email, Set<ERole> roles) {
        this.userName = userName;
        this.email = email;
        this.roles = roles;
    }
}
