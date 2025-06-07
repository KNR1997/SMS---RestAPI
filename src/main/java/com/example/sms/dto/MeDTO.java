package com.example.sms.dto;

import com.example.sms.entity.ERole;
import com.example.sms.entity.Grade;
import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class MeDTO {
    private String userName;


    private String email;

    private ERole erole;

    private Grade grade;

    private Integer studentId;

}
