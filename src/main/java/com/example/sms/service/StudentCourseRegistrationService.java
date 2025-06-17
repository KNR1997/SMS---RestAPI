package com.example.sms.service;

import com.example.sms.dto.Enrollment.EnrollmentCreateDTO;
import com.example.sms.dto.request.StudentCourseEnrollmentRequest;
import com.example.sms.entity.Course;
import com.example.sms.entity.Enrollment;
import com.example.sms.entity.Student;
import com.example.sms.repository.CourseRepository;
import com.example.sms.repository.EnrollmentRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Set;
import java.util.stream.Collectors;

@Service
public class StudentCourseRegistrationService {

    @Autowired
    private StudentService studentService;

    @Autowired
    private CourseRepository courseRepository;

    @Autowired
    private EnrollmentRepository enrollmentRepository;

    @Autowired
    private EnrollmentService enrollmentService;

    @Transactional
    public void enrollStudentInCourses(Integer studentId, StudentCourseEnrollmentRequest request) {
        // Get the student
        Student student = studentService.getStudentById(studentId);

        // Get the courses that are going to be enrolled
        List<Course> coursesToEnroll = courseRepository.findAllById(request.getCourseIds());

        // Get existing enrollments
        Set<Course> alreadyEnrolledCourses = enrollmentRepository.findByStudentId(studentId).stream()
                .map(Enrollment::getCourse)
                .collect(Collectors.toSet());

        for (Course course : coursesToEnroll) {
            if (!alreadyEnrolledCourses.contains(course)) {
                enrollmentService.createEnrollment(new EnrollmentCreateDTO(student, course));
            }
        }
    }
}
