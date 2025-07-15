package com.example.sms.dto.User;

import com.example.sms.enums.GenderType;
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

    private GenderType genderType;

    private String address;

    private String nic;

    private String phoneNumber;

    @NotNull
    private RoleType role;

    private String password;
}
