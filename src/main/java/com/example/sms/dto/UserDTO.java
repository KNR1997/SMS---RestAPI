package com.example.sms.dto;

import com.example.sms.entity.ERole;
import lombok.Data;

@Data
public class UserDTO {
    private String firstName;

    private String lastName;

    private String email;

    private String username;

    private ERole role;

    private String password;

}
