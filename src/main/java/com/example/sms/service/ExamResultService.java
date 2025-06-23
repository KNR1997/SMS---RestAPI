package com.example.sms.service;

import com.example.sms.dto.Exam.ExamUpdateDTO;
import com.example.sms.dto.response.ExamResult.ExamResultPageDataResponse;
import com.example.sms.dto.response.ExamResult.ExamResultPaginatedDataResponse;
import com.example.sms.entity.ExamResult;
import com.example.sms.repository.ExamResultRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

@Service
public class ExamResultService {

    @Autowired
    private ExamResultRepository examResultRepository;

    public Page<ExamResultPaginatedDataResponse> getPaginated(Pageable pageable, String search) {
        Page<ExamResult> examPage = examResultRepository.findAll(pageable);
        return examPage.map(ExamResultPaginatedDataResponse::new);
    }

    public ExamResultPageDataResponse getExamResultPageData(Integer examResultId) {
        ExamResult examResult = examResultRepository.findById(examResultId)
                .orElseThrow(() -> new RuntimeException("ExamResult not found"));
        return new ExamResultPageDataResponse(examResult);
    }

    public void create() {
        //
    }

    public void update(ExamUpdateDTO updateDTO) {
        //
    }

    public void patch() {
        //
    }

    public void delete() {
        //
    }
}
