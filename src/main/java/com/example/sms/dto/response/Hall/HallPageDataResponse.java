package com.example.sms.dto.response.Hall;

import com.example.sms.entity.Hall;
import lombok.Data;

@Data
public class HallPageDataResponse {

    private int id;

    private String name;

    private Integer examCapacity;

    private Integer lectureCapacity;

    public HallPageDataResponse(Hall hall) {
        this.id = hall.getId();
        this.name = hall.getName();
        this.examCapacity = hall.getExamCapacity();
        this.lectureCapacity = hall.getLectureCapacity();
    }
}
