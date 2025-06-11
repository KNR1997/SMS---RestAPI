package com.example.sms.dto.Course;

import com.example.sms.entity.Grade;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class CourseCreateDTO {
    private Integer id;

    private String name;

    private String slug;

    private String code;

    private Grade grade;

    private Integer subjectId;

    private Integer teacherId;

    private Integer batch;

    private Double fee;
}
