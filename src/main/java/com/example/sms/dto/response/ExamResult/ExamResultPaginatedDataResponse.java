package com.example.sms.dto.response.ExamResult;

import com.example.sms.entity.ExamResult;
import lombok.Data;

@Data
public class ExamResultPaginatedDataResponse {

    private Integer id;

    public ExamResultPaginatedDataResponse(ExamResult examResult) {
        this.id = examResult.getId();
    }
}
