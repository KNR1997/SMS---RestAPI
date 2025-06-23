package com.example.sms.dto.response.ExamResult;

import com.example.sms.entity.ExamResult;
import lombok.Data;

@Data
public class ExamResultPageDataResponse {

    private Integer id;

    public ExamResultPageDataResponse(ExamResult examResult) {
        this.id = examResult.getId();
    }
}
