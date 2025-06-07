package com.example.sms.dto.Student;

import com.example.sms.dto.User.UserCreateDTO;
import com.example.sms.entity.Grade;
import lombok.Data;

import java.util.Date;

@Data
public class StudentCreateDTO {

    private UserCreateDTO userDetails;

    private Date dateOfBirth;

    private Grade grade;

    private String guardianName;

    private String contactNumber;
}
