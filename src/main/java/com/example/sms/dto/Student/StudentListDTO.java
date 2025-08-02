package com.example.sms.dto.Student;

import com.example.sms.dto.Guardian.GuardianDetailDTO;
import com.example.sms.enums.GradeType;
import com.example.sms.entity.Student;
import lombok.Data;

@Data
public class StudentListDTO {
    private Integer id;

    private String firstName;

    private String lastName;

    private String email;

    private GradeType gradeType;

    private String studentId;

    private Boolean admissionPayed;

    private boolean isActive;

    private GuardianDetailDTO guardian;

    public StudentListDTO(Student student) {
        this.id = student.getId();
        this.firstName = student.getUser().getFirstName();
        this.lastName = student.getUser().getLastName();
        this.email = student.getUser().getEmail();
        this.gradeType = student.getGradeType();
        this.studentId = student.getStudentId();
        this.admissionPayed = student.getAdmissionPayed();
        this.isActive = student.isActive();
        this.guardian = new GuardianDetailDTO(student.getGuardian());
    }
}
