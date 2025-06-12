package com.example.sms.dto.User;

import com.example.sms.enums.RoleType;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class UserCreateDTO {
    private String firstName;

    private String lastName;

    private String email;

    private String username;

    private RoleType role;

    private String password;
}
