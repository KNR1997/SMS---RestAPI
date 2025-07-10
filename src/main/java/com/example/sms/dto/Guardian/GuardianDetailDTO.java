package com.example.sms.dto.Guardian;

import com.example.sms.entity.Guardian;
import com.example.sms.enums.RelationshipType;
import lombok.Data;

@Data
public class GuardianDetailDTO {
    private Integer id;

    private String firstName;

    private String lastName;

    private String email;

    private String nationalIdentityNumber;

    private String contactNumber;

    private RelationshipType relationship;

    public GuardianDetailDTO(Guardian guardian) {
        this.id = guardian.getId();
        this.firstName = guardian.getFirstName();
        this.lastName = guardian.getLastName();
        this.email = guardian.getEmail();
        this.nationalIdentityNumber = guardian.getNationalIdentityNumber();
        this.contactNumber = guardian.getContactNumber();
        this.relationship = guardian.getRelationship();
    }
}
