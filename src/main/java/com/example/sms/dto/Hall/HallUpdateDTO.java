package com.example.sms.dto.Hall;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
public class HallUpdateDTO {

    private Integer id;

    private String name;

    private Integer examCapacity;

    private Integer lectureCapacity;
}
