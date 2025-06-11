package com.example.sms.dto.Guardian;

import com.example.sms.entity.Guardian;
import lombok.Data;

@Data
public class GuardianListDTO {
    private Integer id;

    private String firstName;

    private String lastName;

    private String email;

    private String nationalIdentityNumber;

    private String contactNumber;

    public GuardianListDTO(Guardian guardian) {
        this.id = guardian.getId();
        this.firstName = guardian.getFirstName();
        this.lastName = guardian.getLastName();
        this.email = guardian.getEmail();
        this.nationalIdentityNumber = guardian.getNationalIdentityNumber();
        this.contactNumber = guardian.getContactNumber();
    }
}
