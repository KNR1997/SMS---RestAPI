package com.example.sms.service;

import com.example.sms.dto.CourseDTO;
import com.example.sms.entity.Course;
import com.example.sms.entity.Grade;
import com.example.sms.exception.BadRequestException;
import com.example.sms.exception.ResourceNotFoundException;
import com.example.sms.repository.CourseRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

@Service
public class CourseService {

    @Autowired
    private CourseRepository courseRepository;

    public Page<Course> getAllCourses(Pageable pageable, String search, String grade) {
        if (grade != null && !grade.isEmpty()) {
            try {
                Grade gradeEnum = Grade.valueOf(grade.toUpperCase()); // Convert string to enum safely
                return courseRepository.findByGrade(gradeEnum, pageable);
            } catch (IllegalArgumentException e) {
                throw new IllegalArgumentException("Invalid grade value: " + grade);
            }
        }

        return courseRepository.findAll(pageable);
    }

    public Course getCourseBySlug(String slug) {
        return courseRepository.findBySlug(slug)
                .orElseThrow(() -> new ResourceNotFoundException("Course not found with slug: " + slug));
    }

    public Course createCourse(CourseDTO createDto) {
        if (courseRepository.existsBySlug(createDto.getSlug())) {
            throw new BadRequestException("Course with slug '" + createDto.getSlug() + "' already exists.");
        }

        Course course = new Course();
        course.setName(createDto.getName());
        course.setSlug(createDto.getSlug());
        course.setCode(createDto.getCode());
        course.setGrade(createDto.getGrade());

        return courseRepository.save(course);

    }

    public Course updateCourse(Integer id, CourseDTO updateDto) {
        Course course = courseRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Course not found with ID: " + id));

        course.setName(updateDto.getName());
        course.setSlug(updateDto.getSlug());
        course.setCode(updateDto.getCode());
        course.setGrade(updateDto.getGrade());

        return courseRepository.save(course);
    }

    public void deleteCourse(Integer id) {
        if (!courseRepository.existsById(id)) {
            throw new ResourceNotFoundException("Course not found with id: " + id);
        }
        courseRepository.deleteById(id);
    }
}
