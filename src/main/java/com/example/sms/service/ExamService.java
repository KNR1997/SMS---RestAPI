package com.example.sms.service;

import com.example.sms.dto.Exam.ExamCreateDTO;
import com.example.sms.dto.Exam.ExamUpdateDTO;
import com.example.sms.dto.response.Exam.ExamPaginatedDataResponse;
import com.example.sms.entity.Course;
import com.example.sms.entity.Exam;
import com.example.sms.enums.ExamStatusType;
import com.example.sms.exception.ResourceNotFoundException;
import com.example.sms.repository.CourseRepository;
import com.example.sms.repository.ExamRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

@Service
public class ExamService {

    @Autowired
    private ExamRepository examRepository;

    @Autowired
    private CourseRepository courseRepository;

    public Page<ExamPaginatedDataResponse> getPaginated(Pageable pageable, String search) {
        Page<Exam> examPage = examRepository.findAll(pageable);

        return examPage.map(ExamPaginatedDataResponse::new);
    }

    public void create(ExamCreateDTO createDTO) {
        Course course = courseRepository.findById(createDTO.getCourseId())
                .orElseThrow(() -> new RuntimeException("Course not found"));

        Exam exam = new Exam();
        exam.setCourse(course);
        exam.setStatus(ExamStatusType.PENDING);

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
