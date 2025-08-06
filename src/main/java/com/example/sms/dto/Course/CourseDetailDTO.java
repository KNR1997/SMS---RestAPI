package com.example.sms.dto.Course;

import com.example.sms.entity.Course;
import com.example.sms.enums.GradeType;
import lombok.Data;

@Data
public class CourseDetailDTO {
    private Integer id;

    private String name;

    private String slug;

    private String code;

    private GradeType gradeType;

    private Integer subjectId;

    private Integer teacherId;

    private Integer batch;

    private Integer year;

    private Double fee;

    public CourseDetailDTO(Course course) {
        this.id = course.getId();
        this.name = course.getName();
        this.slug = course.getSlug();
        this.code = course.getCode();
        this.gradeType = course.getGradeType();
        this.subjectId = course.getSubject().getId();
        this.teacherId = course.getTeacher().getId();
        this.batch = course.getBatch();
        this.fee = course.getFee();
        this.year = course.getYear();
    }
}
