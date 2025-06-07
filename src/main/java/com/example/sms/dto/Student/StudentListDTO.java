package com.example.sms.dto.Student;

import com.example.sms.entity.Grade;
import com.example.sms.entity.Student;
import lombok.Data;

@Data
public class StudentListDTO {
    private Integer id;

    private String firstName;

    private String lastName;

    private String email;

    private Grade grade;

    private String studentId;

    public StudentListDTO(Student student) {
        this.id = student.getId();
        this.firstName = student.getUser().getFirstName();
        this.lastName = student.getUser().getLastName();
        this.email = student.getUser().getEmail();
        this.grade = student.getGrade();
        this.studentId = student.getStudentId();
    }
}
