package com.example.sms.dto;

import lombok.Data;

import java.util.Set;

@Data
public class EnrollCourseDTO {

    private Integer studentId;

    private Set<Integer> courses;

}
