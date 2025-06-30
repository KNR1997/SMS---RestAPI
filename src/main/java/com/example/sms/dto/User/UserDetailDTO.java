package com.example.sms.dto.User;

import com.example.sms.entity.Role;
import com.example.sms.entity.User;
import lombok.Data;

@Data
public class UserDetailDTO {
    private Integer id;

    private String firstName;

    private String lastName;

    private String email;

    private String username;

    private Role role;

    public UserDetailDTO(User user) {
        this.id = user.getId();
        this.firstName = user.getFirstName();
        this.lastName = user.getLastName();
        this.email = user.getEmail();
        this.username = user.getUsername();
        this.role = user.getRole();
    }
}
