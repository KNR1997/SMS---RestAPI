package com.example.sms.dto.User;

import com.example.sms.enums.RoleType;
import jakarta.validation.constraints.NotNull;
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

    @NotNull
    private RoleType role;

    private String password;
}
