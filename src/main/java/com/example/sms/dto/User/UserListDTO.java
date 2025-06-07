package com.example.sms.dto.User;

import lombok.Data;

@Data
public class UserListDTO {
    private Integer id;

    private String firstName;

    private String lastName;

    private String email;

    private String username;
}
