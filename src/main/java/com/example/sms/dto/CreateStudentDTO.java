package com.example.sms.dto;

import lombok.Data;

import java.util.Date;

@Data
public class CreateStudentDTO {

    private CreateUserDTO userDetails;

    private String studentId;

    private Date dateOfBirth;
}
