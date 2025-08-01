package com.example.sms.dto.Course;

import com.example.sms.entity.Course;
import com.example.sms.enums.GradeType;
import lombok.Data;

@Data
public class CourseListDTO {
    private Integer id;

    private String name;

    private String slug;

    private String code;

    private GradeType gradeType;

    private Double fee;

    private boolean isActive;

    public CourseListDTO(Course course) {
        this.id = course.getId();
        this.name = course.getName();
        this.slug = course.getSlug();
        this.code = course.getCode();
        this.gradeType = course.getGradeType();
        this.fee = course.getFee();
        this.isActive = course.isActive();
    }
}
