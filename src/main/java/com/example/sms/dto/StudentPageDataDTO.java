package com.example.sms.dto;

import com.example.sms.entity.Grade;
import lombok.AllArgsConstructor;
import lombok.Data;

import java.util.Date;

@Data
@AllArgsConstructor
public class StudentPageDataDTO {
    private Integer id;

    private String firstName;

    private String lastName;

    private String email;

    private String username;

    private Date dateOfBirth;

    private Grade grade;

    private String guardianName;

    private String contactNumber;

}
