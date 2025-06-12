package com.example.sms.dto;

import com.example.sms.enums.GradeType;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class CourseDTO {

    private Integer id;

    private String name;

    private String slug;

    private String code;

    private GradeType gradeType;

}
