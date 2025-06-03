package com.example.sms.dto;

import com.example.sms.entity.Grade;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class CourseDTO {

    private String name;

    private String slug;

    private String code;

    private Grade grade;

}
