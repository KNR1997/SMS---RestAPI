package com.example.sms.dto.User;

import com.example.sms.enums.RoleType;
import com.example.sms.entity.User;
import lombok.Data;

@Data
public class UserListDTO {
    private Integer id;

    private String firstName;

    private String lastName;

    private String email;

    private String username;

    private RoleType role;

    private boolean isActive;

    public UserListDTO(User user) {
        this.id = user.getId();
        this.firstName = user.getFirstName();
        this.lastName = user.getLastName();
        this.email = user.getEmail();
        this.username = user.getUsername();
        this.role = user.getRole().getName();
        this.isActive = user.isActive();
    }
}
