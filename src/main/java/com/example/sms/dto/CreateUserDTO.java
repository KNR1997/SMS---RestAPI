package com.example.sms.dto;

import com.example.sms.entity.ERole;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class CreateUserDTO {
    private String firstName;

    private String lastName;

    private String email;

    private String username;

    private ERole role;

    private String password;
}
