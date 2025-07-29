package com.example.sms.service;

import com.example.sms.dto.Course.CourseCreateDTO;
import com.example.sms.dto.Course.CourseListDTO;
import com.example.sms.entity.Course;
import com.example.sms.entity.Student;
import com.example.sms.entity.Subject;
import com.example.sms.entity.User;
import com.example.sms.enums.GradeType;
import com.example.sms.enums.RoleType;
import com.example.sms.exception.BadRequestException;
import com.example.sms.exception.CourseInUseException;
import com.example.sms.exception.ResourceNotFoundException;
import com.example.sms.repository.*;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import static com.example.sms.utils.SearchUtil.extractSearchValue;

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

    @Autowired
    private ExamRepository examRepository;

    @Autowired
    private EventRepository eventRepository;

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

    @Transactional
    public Course createCourse(CourseCreateDTO createDto) {
        if (courseRepository.existsBySlug(createDto.getSlug())) {
            throw new BadRequestException("Course with slug '" + createDto.getSlug() + "' already exists.");
        }

        if (courseRepository.existsByCode(createDto.getCode())) {
            throw new BadRequestException("Course with name '" + createDto.getName() + "' already exists.");
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
        course.setDescription(createDto.getDescription());

        return courseRepository.save(course);

    }

    @Transactional
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

    public void enableCourse(int courseId) {
        Course course = courseRepository.findById(courseId)
                .orElseThrow(() -> new ResourceNotFoundException("Course not found with ID: " + courseId));

        course.setActive(true);
        courseRepository.save(course);
    }

    public void disableCourse(int courseId) {
        Course course = courseRepository.findById(courseId)
                .orElseThrow(() -> new ResourceNotFoundException("Course not found with ID: " + courseId));

        course.setActive(false);
        courseRepository.save(course);
    }

    public void deleteCourse(Integer courseId) {
        Course course = courseRepository.findById(courseId)
                .orElseThrow(() -> new ResourceNotFoundException("Course not found with ID: " + courseId));

        boolean isCourseUsedInExams = examRepository.existsByCourse(course);
        boolean isCourseUsedInEnrollments = enrollmentRepository.existsByCourse(course);
        boolean isCourseUsedInEvents = eventRepository.existsByCourse(course);

        if (isCourseUsedInExams) {
            throw new CourseInUseException("Course is linked to existing exam and cannot be deleted.");
        }
        if (isCourseUsedInEnrollments) {
            throw new CourseInUseException("Course is linked to existing enrollment and cannot be deleted.");
        }
        if (isCourseUsedInEvents) {
            throw new CourseInUseException("Course is linked to existing event and cannot be deleted.");
        }

        courseRepository.deleteById(courseId);
    }
}
