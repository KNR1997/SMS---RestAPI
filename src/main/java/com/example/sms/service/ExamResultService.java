package com.example.sms.service;

import com.example.sms.dto.Exam.ExamUpdateDTO;
import com.example.sms.dto.ExamResult.ExamResultUpdateDTO;
import com.example.sms.dto.response.ExamResult.ExamResultPageDataResponse;
import com.example.sms.dto.response.ExamResult.ExamResultPaginatedDataResponse;
import com.example.sms.entity.Exam;
import com.example.sms.entity.ExamResult;
import com.example.sms.entity.Student;
import com.example.sms.entity.User;
import com.example.sms.enums.RoleType;
import com.example.sms.exception.ResourceNotFoundException;
import com.example.sms.repository.ExamRepository;
import com.example.sms.repository.ExamResultRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

@Service
public class ExamResultService {

    @Autowired
    private ExamResultRepository examResultRepository;

    @Autowired
    private ExamRepository examRepository;

    @Autowired
    private StudentService studentService;

    public Page<ExamResultPaginatedDataResponse> getPaginated(
            Pageable pageable,
            String search,
            Integer examId,
            User currentUser
    ) {
        Page<ExamResult> examPage;

        if(currentUser.isAdmin()) {
            Exam exam = examRepository.findById(examId)
                    .orElseThrow(() -> new ResourceNotFoundException("Exam not found"));
            examPage = examResultRepository.findByExam(exam, pageable);
        } else if (currentUser.getRole().getName().equals(RoleType.ROLE_STUDENT)) {
            Student student = studentService.getStudentByUser(currentUser);
            examPage = examResultRepository.findByStudent(student, pageable);
        } else {
            examPage = examResultRepository.findAll(pageable);
        }

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

    public void update(Integer id, ExamResultUpdateDTO updateDTO) {
        ExamResult examResult = examResultRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("ExamResult not found"));
        examResult.setResult(updateDTO.getResult());
        examResultRepository.save(examResult);
    }

    public void patch() {
        //
    }

    public void delete() {
        //
    }
}
