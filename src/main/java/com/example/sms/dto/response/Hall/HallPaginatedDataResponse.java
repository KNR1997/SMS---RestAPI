package com.example.sms.dto.response.Hall;

import com.example.sms.entity.Hall;
import lombok.Data;

@Data
public class HallPaginatedDataResponse {

    private Integer id;

    private String name;

    private Integer examCapacity;

    private Integer lectureCapacity;

    private boolean isActive;

    public HallPaginatedDataResponse(Hall hall) {
        this.id = hall.getId();
        this.name = hall.getName();
        this.examCapacity = hall.getExamCapacity();
        this.lectureCapacity = hall.getLectureCapacity();
        this.isActive = hall.isActive();
    }
}
