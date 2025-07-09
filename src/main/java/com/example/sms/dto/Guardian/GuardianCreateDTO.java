package com.example.sms.dto.Guardian;

import com.example.sms.enums.RelationshipType;
import lombok.Data;

@Data
public class GuardianCreateDTO {
    private Integer id;

    private String firstName;

    private String lastName;

    private String email;

    private String nationalIdentityNumber;

    private String contactNumber;

    private RelationshipType relationship;
}
