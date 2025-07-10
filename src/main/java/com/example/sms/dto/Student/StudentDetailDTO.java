package com.example.sms.dto.Student;

import com.example.sms.dto.Guardian.GuardianDetailDTO;
import com.example.sms.entity.Student;
import com.example.sms.enums.GenderType;
import com.example.sms.enums.GradeType;
import com.example.sms.enums.RelationshipType;
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

    private GradeType gradeType;

    private GuardianDetailDTO guardianPageData;

    private String address;

    private GenderType genderType;

    public StudentDetailDTO(Student student) {
        this.id = student.getId();
        this.firstName = student.getUser().getFirstName();
        this.lastName = student.getUser().getLastName();
        this.email = student.getUser().getEmail();
        this.username = student.getUser().getUsername();
        this.dateOfBirth = student.getDateOfBirth();
        this.gradeType = student.getGradeType();
        this.guardianPageData = new GuardianDetailDTO(student.getGuardian());
        this.address = student.getUser().getAddress();
        this.genderType = student.getUser().getGenderType();
    }

}
