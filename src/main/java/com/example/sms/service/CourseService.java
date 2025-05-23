package com.example.sms.service;

import com.example.sms.dto.CourseDTO;
import com.example.sms.entity.Course;
import com.example.sms.exception.CourseNotFoundException;
import com.example.sms.repository.CourseRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class CourseService {

    @Autowired
    private CourseRepository courseRepository;

    public List<Course> getAllCourse() {
        return courseRepository.findAll();
    }

    public Course createCourse(CourseDTO createDto) {
        Course course = new Course();
        course.setName(createDto.getName());
        course.setSlug(createDto.getSlug());

        return courseRepository.save(course);

    }

    public Course updateCourse(Integer id, CourseDTO updateDto) {
        Course course = courseRepository.findById(id)
                .orElseThrow(() -> new CourseNotFoundException("Course not found with ID: " + id));

        course.setName(updateDto.getName());
        course.setSlug(updateDto.getSlug());

        return courseRepository.save(course);
    }

    public void deleteCourse(Integer id) {
        if (!courseRepository.existsById(id)) {
            throw new CourseNotFoundException("Course not found with ID: " + id);
        }
        courseRepository.deleteById(id);
    }
}
