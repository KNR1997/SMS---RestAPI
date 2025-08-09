package com.example.sms.dto.Event;

import com.example.sms.enums.EventRepeatType;
import com.example.sms.enums.EventType;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.LocalTime;
import java.util.List;

@Data
@AllArgsConstructor
public class EventUpdateDTO {

    private int id;

    private String code;

    private EventType eventType;

    private LocalDate date;

    private LocalTime  startTime;

    private LocalTime endTime;

    private String reference;

    private List<Integer> hallIds;

    private EventRepeatType eventRepeatType;

}
