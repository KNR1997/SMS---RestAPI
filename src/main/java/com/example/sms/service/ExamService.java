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
import com.example.sms.repository.*;
import org.apache.poi.ss.usermodel.Cell;
import org.apache.poi.ss.usermodel.Row;
import org.apache.poi.ss.usermodel.Sheet;
import org.apache.poi.ss.usermodel.Workbook;
import org.apache.poi.xssf.usermodel.XSSFWorkbook;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
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

    @Autowired
    private StudentRepository studentRepository;

    @Autowired
    private ExamResultRepository examResultRepository;

    @Autowired
    private EnrollmentRepository enrollmentRepository;

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

    @Transactional
    public void update(Integer id, ExamUpdateDTO updateDTO) {
        Exam exam = examRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Exam not found"));

        Event event = eventRepository.findByExam(exam)
                .orElseThrow(() -> new ResourceNotFoundException("Event not found"));

        event.setDate(updateDTO.getDate());
        event.setStartTime(updateDTO.getStartTime());
        event.setEndTime(updateDTO.getEndTime());

        exam.setStatus(updateDTO.getStatus());
        examRepository.save(exam);
        eventRepository.save(event);
    }

    public void updateExamResults(Integer examId, MultipartFile file) {
        Exam exam = examRepository.findById(examId)
                .orElseThrow(() -> new ResourceNotFoundException("Exam not found"));

        try (Workbook workbook = new XSSFWorkbook(file.getInputStream())) {
            Sheet sheet = workbook.getSheetAt(0);

            for (Row row : sheet) {
                if (row.getRowNum() == 0) continue; // skip header

                Cell studentIdCell = row.getCell(0);
                Cell resultCell = row.getCell(1);

                double studentIdDouble = studentIdCell.getNumericCellValue();
                Integer studentId = (int) studentIdDouble;

                String result = resultCell.getStringCellValue();

                Student student = studentRepository.findById(studentId)
                        .orElseThrow(() -> new ResourceNotFoundException("Student not found"));

                ExamResult examResult = new ExamResult();
                examResult.setExam(exam);
                examResult.setStudent(student);
                examResult.setResult(result);

                examResultRepository.save(examResult);
            }
        } catch (IOException e) {
            throw new RuntimeException("Failed to process file", e);
        }
    }

    public void generateResultTable(Integer id) {
        Exam exam = examRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Exam not found"));

        Course course = exam.getCourse();
        List<Enrollment> enrollments = enrollmentRepository.findByCourse(course);

        for (Enrollment enrollment : enrollments) {
            Student student = enrollment.getStudent();

            boolean alreadyExists = examResultRepository.existsByExamAndStudent(exam, student);
            if (!alreadyExists) {
                ExamResult examResult = new ExamResult();
                examResult.setExam(exam);
                examResult.setStudent(student);
                examResultRepository.save(examResult);
            }
        }
    }

    public void patch(ExamUpdateDTO patchDTO) {
        //
    }

    public void delete() {
        //
    }
}
