package com.example.sms.dto.Course;

import com.example.sms.entity.Course;
import com.example.sms.entity.Grade;
import lombok.Data;

@Data
public class CourseListDTO {
    private Integer id;

    private String name;

    private String slug;

    private String code;

    private Grade grade;

    private Double fee;

    public CourseListDTO(Course course) {
        this.id = course.getId();
        this.name = course.getName();
        this.slug = course.getSlug();
        this.code = course.getCode();
        this.grade = course.getGrade();
        this.fee = course.getFee();
    }
}
