package com.example.sms.dto.Enrollment;

import com.example.sms.dto.EnrollmentPayment.EnrollmentPaymentCreateDTO;
import com.example.sms.entity.Course;
import com.example.sms.entity.Student;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class EnrollmentCreateDTO {

    private Integer studentId;

    private Integer courseId;

    private Student student;

    private Course course;

    private List<EnrollmentPaymentCreateDTO> payments;

    // Constructor with just IDs
    public EnrollmentCreateDTO(Integer studentId, Integer courseId) {
        this.studentId = studentId;
        this.courseId = courseId;
    }

    // Constructor with entities
    public EnrollmentCreateDTO(Student student, Course course) {
        this.student = student;
        this.course = course;
        this.studentId = student != null ? student.getId() : null;
        this.courseId = course != null ? course.getId() : null;
    }
}
