package com.example.sms.dto;

import com.example.sms.enums.RoleType;
import lombok.AllArgsConstructor;
import lombok.Data;

import java.util.Set;

@Data
@AllArgsConstructor
public class UserPageDataDTO {
    private Integer id;

    private String firstName;

    private String lastName;

    private String email;

    private String username;

    private Set<RoleType> roles;

}
