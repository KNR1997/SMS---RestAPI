package com.example.sms.dto.Course;

import com.example.sms.enums.GradeType;
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

    private GradeType gradeType;

    private Integer subjectId;

    private Integer teacherId;

    private Integer batch;

    private Double fee;

    private String description;
}
