package com.example.sms.service;

import com.example.sms.dto.Event.EventCreateDTO;
import com.example.sms.dto.Exam.ExamCreateDTO;
import com.example.sms.dto.Exam.ExamUpdateDTO;
import com.example.sms.dto.response.Exam.ExamPageDataResponse;
import com.example.sms.dto.response.Exam.ExamPaginatedDataResponse;
import com.example.sms.entity.*;
import com.example.sms.enums.EventType;
import com.example.sms.enums.ExamStatusType;
import com.example.sms.exception.ResourceNotFoundException;
import com.example.sms.repository.CourseRepository;
import com.example.sms.repository.EventHallAssignmentRepository;
import com.example.sms.repository.EventRepository;
import com.example.sms.repository.ExamRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class ExamService {

    @Autowired
    private ExamRepository examRepository;

    @Autowired
    private CourseRepository courseRepository;

    @Autowired
    private EventService eventService;

    @Autowired
    private EventRepository eventRepository;

    @Autowired
    private EventHallAssignmentRepository eventHallAssignmentRepository;

    public Page<ExamPaginatedDataResponse> getPaginated(Pageable pageable, String search) {
        Page<Exam> examPage = examRepository.findAll(pageable);
        return examPage.map(ExamPaginatedDataResponse::new);
    }

    public ExamPageDataResponse getExamPageData(Integer examId) {
        Exam exam = examRepository.findById(examId)
                .orElseThrow(() -> new RuntimeException("Exam not found"));
        Event event = eventRepository.findByExam(exam)
                .orElseThrow(() -> new ResourceNotFoundException("Event not found"));
        List<Hall> halls = eventHallAssignmentRepository.findByEvent(event)
                .stream()
                .map(EventHallAssignment::getHall)
                .collect(Collectors.toList());
        return new ExamPageDataResponse(exam, event, halls);
    }

    @Transactional
    public void create(ExamCreateDTO createDTO) {
        Course course = courseRepository.findById(createDTO.getCourseId())
                .orElseThrow(() -> new RuntimeException("Course not found"));

        Exam exam = new Exam();
        exam.setCourse(course);
        exam.setCapacity(createDTO.getCapacity());
        exam.setStatus(ExamStatusType.PENDING);
        exam = examRepository.save(exam);

        Event event = eventService.create(new EventCreateDTO(
                course.getId(),
                createDTO.getCode(),
                EventType.EXAM,
                createDTO.getDate(),
                createDTO.getStartTime(),
                createDTO.getEndTime(),
                createDTO.getReference(),
                createDTO.getHallIds()
        ));
        event.setExam(exam);
        eventRepository.save(event);
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
