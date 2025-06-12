package com.example.sms.dto.Enrollment;

import com.example.sms.entity.Enrollment;
import com.example.sms.enums.EnrollmentStatusType;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class EnrollmentListDTO {

    private Integer id;

    private String studentName;

    private String courseName;

    private LocalDate enrollmentDate;

    private EnrollmentStatusType status;

    public EnrollmentListDTO(Enrollment enrollment) {
        this.id = enrollment.getId();
        this.studentName = enrollment.getStudent().getUser().getFirstName();
        this.courseName = enrollment.getCourse().getName();
        this.enrollmentDate = enrollment.getEnrollmentDate();
        this.status = enrollment.getStatus();
    }
}
