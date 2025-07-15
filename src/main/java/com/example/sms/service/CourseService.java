package com.example.sms.service;

import com.example.sms.dto.Course.CourseCreateDTO;
import com.example.sms.dto.Course.CourseListDTO;
import com.example.sms.entity.*;
import com.example.sms.enums.GradeType;
import com.example.sms.enums.RoleType;
import com.example.sms.exception.BadRequestException;
import com.example.sms.exception.ResourceNotFoundException;
import com.example.sms.repository.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class CourseService {

    @Autowired
    private CourseRepository courseRepository;

    @Autowired
    private SubjectRepository subjectRepository;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private StudentRepository studentRepository;

    @Autowired
    private EnrollmentRepository enrollmentRepository;

    private String extractSearchValue(String search, String key) {
        if (search == null || search.isEmpty()) return null;

        String[] parts = search.split(";");
        for (String part : parts) {
            String[] keyValue = part.split(":");
            if (keyValue.length == 2 && keyValue[0].equalsIgnoreCase(key)) {
                return keyValue[1];
            }
        }
        return null;
    }

    public Page<CourseListDTO> getCoursesPaginated(
            Pageable pageable,
            String search,
            String grade,
            User currentUser
    ) {
        GradeType gradeType = grade != null ? GradeType.valueOf(grade.toUpperCase()) : null;
        String name = extractSearchValue(search, "name");

        Page<Course> coursePage = null;

        if (currentUser.isAdmin()) {
            // Admin sees all courses
            coursePage = courseRepository.searchCourses(name, gradeType, pageable);

        } else if (currentUser.getRole().getName().equals(RoleType.ROLE_STUDENT)) {
            // Student sees only enrolled courses
            Student student = studentRepository.findByUser(currentUser)
                    .orElseThrow(() -> new ResourceNotFoundException("Student not found"));

            coursePage = courseRepository.searchCoursesByStudentEnrollments(name, gradeType, student.getId(), pageable);

        } else if (currentUser.getRole().getName().equals(RoleType.ROLE_TEACHER)) {
            User user = userRepository.findById(currentUser.getId())
                    .orElseThrow(() -> new ResourceNotFoundException("User not found"));

            coursePage = (gradeType != null)
                    ? courseRepository.findByTeacherAndGradeType(user, gradeType, pageable)
                    : courseRepository.findByTeacher(user, pageable);
        } else {
            coursePage = (gradeType != null)
                    ? courseRepository.findByGradeType(gradeType, pageable)
                    : courseRepository.findAll(pageable);
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
