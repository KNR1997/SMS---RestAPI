package com.example.sms.dto.Student;

import com.example.sms.dto.Guardian.GuardianCreateDTO;
import com.example.sms.dto.User.UserCreateDTO;
import com.example.sms.enums.GradeType;
import lombok.Data;

import java.util.Date;

@Data
public class StudentCreateDTO {

    private UserCreateDTO userDetails;

    private GuardianCreateDTO guardianDetails;

    private Date dateOfBirth;

    private GradeType gradeType;

}
