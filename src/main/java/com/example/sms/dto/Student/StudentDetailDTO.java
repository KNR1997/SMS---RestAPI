package com.example.sms.dto.Student;

import com.example.sms.entity.Grade;
import com.example.sms.entity.Student;
import lombok.AllArgsConstructor;
import lombok.Data;

import java.util.Date;

@Data
@AllArgsConstructor
public class StudentDetailDTO {
    private Integer id;

    private String firstName;

    private String lastName;

    private String email;

    private String username;

    private Date dateOfBirth;

    private Grade grade;

    private String guardianName;

    private String contactNumber;

    public StudentDetailDTO(Student student) {
        this.id = student.getId();
        this.firstName = student.getUser().getFirstName();
        this.lastName = student.getUser().getLastName();
        this.email = student.getUser().getEmail();
        this.username = student.getUser().getUsername();
        this.dateOfBirth = student.getDateOfBirth();
        this.grade = student.getGrade();
        this.guardianName = student.getGuardianName();
        this.contactNumber = student.getContactNumber();
    }

}
