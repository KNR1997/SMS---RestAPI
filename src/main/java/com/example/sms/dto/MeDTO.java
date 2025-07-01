package com.example.sms.dto;

import com.example.sms.enums.GradeType;
import com.example.sms.enums.RoleType;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class MeDTO {

    private String firstName;

    private String lastName;

    private String userName;

    private String email;

    private RoleType erole;

    private GradeType gradeType;

    private Integer studentId;

}
