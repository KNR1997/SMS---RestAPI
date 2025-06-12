package com.example.sms.dto;

import com.example.sms.enums.RoleType;
import com.example.sms.enums.GradeType;
import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class MeDTO {
    private String userName;


    private String email;

    private RoleType erole;

    private GradeType gradeType;

    private Integer studentId;

}
