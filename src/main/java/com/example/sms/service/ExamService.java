package com.example.sms.service;

import com.example.sms.dto.Exam.ExamCreateDTO;
import com.example.sms.dto.Exam.ExamUpdateDTO;
import com.example.sms.entity.Exam;
import com.example.sms.exception.ResourceNotFoundException;
import com.example.sms.repository.ExamRepository;
import org.springframework.beans.factory.annotation.Autowired;

public class ExamService {

    @Autowired
    private ExamRepository examRepository;

    public void create(ExamCreateDTO createDTO) {
        Exam exam = new Exam();
        exam.setCapacity(createDTO.getCapacity());

        examRepository.save(exam);
    }

    public void update(ExamUpdateDTO updateDTO) {
        Exam exam = examRepository.findById(updateDTO.getId())
                .orElseThrow(() -> new ResourceNotFoundException("Exam not found"));

        exam.setCapacity(updateDTO.getCapacity());
        examRepository.save(exam);
    }

    public void patch() {
        //
    }

    public void delete() {
        //
    }
}
