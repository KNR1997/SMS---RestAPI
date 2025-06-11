package com.example.sms.dto.Guardian;

import lombok.Data;

@Data
public class GuardianCreateDTO {
    private Integer id;

    private String firstName;

    private String lastName;

    private String email;

    private String nationalIdentityNumber;

    private String contactNumber;
}
