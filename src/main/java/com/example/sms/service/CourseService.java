package com.example.sms.service;

import com.example.sms.dto.Course.CourseCreateDTO;
import com.example.sms.dto.Course.CourseListDTO;
import com.example.sms.entity.Course;
import com.example.sms.enums.GradeType;
import com.example.sms.entity.Subject;
import com.example.sms.entity.User;
import com.example.sms.exception.BadRequestException;
import com.example.sms.exception.ResourceNotFoundException;
import com.example.sms.repository.CourseRepository;
import com.example.sms.repository.SubjectRepository;
import com.example.sms.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

@Service
public class CourseService {

    @Autowired
    private CourseRepository courseRepository;

    @Autowired
    private SubjectRepository subjectRepository;

    @Autowired
    private UserRepository userRepository;

    public Page<CourseListDTO> getCoursesPaginated(Pageable pageable, String search, String grade) {
        Page<Course> coursePage;

        if (grade != null && !grade.isEmpty()) {
            try {
                GradeType gradeTypeEnum = GradeType.valueOf(grade.toUpperCase()); // Convert string to enum safely
                coursePage = courseRepository.findByGradeType(gradeTypeEnum, pageable);
            } catch (IllegalArgumentException e) {
                throw new IllegalArgumentException("Invalid grade value: " + grade);
            }
        } else {
            coursePage = courseRepository.findAll(pageable);
        }

        return coursePage.map(CourseListDTO::new);
    }

    public Course getCourseBySlug(String slug) {
        return courseRepository.findBySlug(slug)
                .orElseThrow(() -> new ResourceNotFoundException("Course not found with slug: " + slug));
    }

    public Course getCourseById(Integer id) {
        return courseRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Course not found with id: " + id));
    }

    public Course createCourse(CourseCreateDTO createDto) {
        if (courseRepository.existsBySlug(createDto.getSlug())) {
            throw new BadRequestException("Course with slug '" + createDto.getSlug() + "' already exists.");
        }

        Subject subject = subjectRepository.findById(createDto.getSubjectId())
                .orElseThrow(() -> new ResourceNotFoundException("Subject not found with id: " + createDto.getSubjectId()));

        User teacher = userRepository.findById(createDto.getTeacherId())
                .orElseThrow(() -> new ResourceNotFoundException("User not found with id: " + createDto.getTeacherId()));

        Course course = new Course();
        course.setName(createDto.getName());
        course.setSlug(createDto.getSlug());
        course.setCode(createDto.getCode());
        course.setGradeType(createDto.getGradeType());
        course.setSubject(subject);
        course.setTeacher(teacher);
        course.setBatch(createDto.getBatch());
        course.setFee(createDto.getFee());

        return courseRepository.save(course);

    }

    public Course updateCourse(Integer id, CourseCreateDTO updateDto) {
        Course course = courseRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Course not found with ID: " + id));

        Subject subject = subjectRepository.findById(updateDto.getSubjectId())
                .orElseThrow(() -> new ResourceNotFoundException("Subject not found with id: " + updateDto.getSubjectId()));

        User teacher = userRepository.findById(updateDto.getTeacherId())
                .orElseThrow(() -> new ResourceNotFoundException("User not found with id: " + updateDto.getTeacherId()));

        course.setName(updateDto.getName());
        course.setSlug(updateDto.getSlug());
        course.setCode(updateDto.getCode());
        course.setGradeType(updateDto.getGradeType());
        course.setSubject(subject);
        course.setTeacher(teacher);
        course.setBatch(updateDto.getBatch());
        course.setFee(updateDto.getFee());

        return courseRepository.save(course);
    }

    public void deleteCourse(Integer id) {
        if (!courseRepository.existsById(id)) {
            throw new ResourceNotFoundException("Course not found with id: " + id);
        }
        courseRepository.deleteById(id);
    }
}
