package com.example.sms.dto.Subject;

import com.example.sms.entity.Subject;
import lombok.Data;

@Data
public class SubjectDetailDTO {

    private int id;

    private String name;

    private String slug;

    private String code;

    public SubjectDetailDTO(Subject subject) {
        this.id = subject.getId();
        this.name = subject.getName();
        this.slug = subject.getSlug();
        this.code = subject.getCode();
    }
}
