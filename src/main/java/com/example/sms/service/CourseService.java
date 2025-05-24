package com.example.sms.service;

import com.example.sms.dto.CourseDTO;
import com.example.sms.entity.Course;
import com.example.sms.exception.CourseNotFoundException;
import com.example.sms.exception.ResourceNotFoundException;
import com.example.sms.repository.CourseRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

@Service
public class CourseService {

    @Autowired
    private CourseRepository courseRepository;

//    public List<Course> getAllCourse() {
//        return courseRepository.findAll();
//    }

    public Page<Course> getAllCourses(int page, int limit, String orderBy, String sortedBy, String language, String search) {
        Sort sort = sortedBy.equalsIgnoreCase("desc") ? Sort.by(orderBy).descending() : Sort.by(orderBy).ascending();
        Pageable pageable = PageRequest.of(page, limit, sort);

//        if (search != null && !search.isEmpty()) {
//            return courseRepository.findByTitleContainingAndLanguage(search, language, pageable);
//        }

//        if (language != null && !language.isEmpty()) {
//            return courseRepository.findByLanguage(language, pageable);
//        }

        return courseRepository.findAll(pageable);
    }

    public Course getCourseBySlug(String slug) {
        return courseRepository.findBySlug(slug)
                .orElseThrow(() -> new ResourceNotFoundException("Course not found with slug: " + slug));
    }

    public Course createCourse(CourseDTO createDto) {
        Course course = new Course();
        course.setName(createDto.getName());
        course.setSlug(createDto.getSlug());
        course.setCode(createDto.getCode());

        return courseRepository.save(course);

    }

    public Course updateCourse(Integer id, CourseDTO updateDto) {
        Course course = courseRepository.findById(id)
                .orElseThrow(() -> new CourseNotFoundException("Course not found with ID: " + id));

        course.setName(updateDto.getName());
        course.setSlug(updateDto.getSlug());
        course.setCode(updateDto.getCode());

        return courseRepository.save(course);
    }

    public void deleteCourse(Integer id) {
        if (!courseRepository.existsById(id)) {
            throw new CourseNotFoundException("Course not found with ID: " + id);
        }
        courseRepository.deleteById(id);
    }
}
