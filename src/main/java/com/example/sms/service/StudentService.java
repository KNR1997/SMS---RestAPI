package com.example.sms.service;

import com.example.sms.dto.Course.CourseListDTO;
import com.example.sms.dto.Guardian.GuardianCreateDTO;
import com.example.sms.dto.Guardian.GuardianListDTO;
import com.example.sms.dto.Student.GradeStudentCountDTO;
import com.example.sms.dto.Student.StudentCreateDTO;
import com.example.sms.dto.Student.StudentListDTO;
import com.example.sms.entity.*;
import com.example.sms.enums.GradeType;
import com.example.sms.enums.RoleType;
import com.example.sms.exception.ResourceNotFoundException;
import com.example.sms.exception.StudentInUseException;
import com.example.sms.exception.UserInUserException;
import com.example.sms.repository.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.Year;
import java.util.List;

import static com.example.sms.utils.SearchUtil.extractSearchValue;

@Service
public class StudentService {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private StudentRepository studentRepository;

    @Autowired
    private UserService userService;

    @Autowired
    private CourseRepository courseRepository;

    @Autowired
    private GuardianService guardianService;

    @Autowired
    private PaymentService paymentService;

    @Autowired
    private EnrollmentRepository enrollmentRepository;

    @Autowired
    private EnrollmentPaymentService enrollmentPaymentService;

    @Autowired
    private GuardianRepository guardianRepository;

    @Autowired
    private ExamResultRepository examResultRepository;

    public Page<StudentListDTO> getStudentsPaginated(
            Pageable pageable,
            String search,
            String grade,
            Boolean admissionPayed,
            User currentUser,
            Boolean is_active
    ) {
        Page<Student> studentPage = null;
        String name = extractSearchValue(search, "name");
        GradeType gradeType = grade != null ? GradeType.valueOf(grade.toUpperCase()) : null;

        if (currentUser.isAdmin()) {
            studentPage = studentRepository.searchStudent(name, gradeType, admissionPayed, is_active, pageable);
        } else if (currentUser.getRole().getName().equals(RoleType.ROLE_TEACHER)) {
            User user = userRepository.findById(currentUser.getId())
                    .orElseThrow(() -> new ResourceNotFoundException("User not found"));

            List<Course> courses = courseRepository.findByTeacher(user);
            studentPage = enrollmentRepository.findDistinctStudentsByCourseIn(courses, true, pageable);
        } else {
            studentPage = studentRepository.searchStudent(name, gradeType, admissionPayed, is_active, pageable);
        }
        assert studentPage != null;
        return studentPage.map(StudentListDTO::new);
    }

//    public Page<StudentListDTO> getStudentsPaginated(Pageable pageable) {
//        Page<Student> studentPage = studentRepository.findAll(pageable);
//        return studentPage.map(StudentListDTO::new);
//    }

    public Student getStudentById(Integer id) {
        return studentRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Student not found with id: " + id));
    }

    public Student getStudentByUser(User user) {
        return studentRepository.findByUser(user)
                .orElseThrow(() -> new ResourceNotFoundException("Student not found"));
    }

    @Transactional
    public Student createStudent(StudentCreateDTO studentCreateDTO) {

        // First create a User
        User newUser = userService.createUser(studentCreateDTO.getUserDetails());

        // Create a new Student
        Student student = new Student();
        student.setUser(newUser);
        student.setStudentId(generateStudentId());
        student.setDateOfBirth(studentCreateDTO.getDateOfBirth());
        student.setGradeType(studentCreateDTO.getGradeType());

        Guardian guardian;
        Integer guardianId = studentCreateDTO.getGuardianDetails().getId();
        if (guardianId == null) {
            // If no ID is provided, create a new guardian
            guardian = guardianService.createGuardian(studentCreateDTO.getGuardianDetails());
        } else {
            // Otherwise, fetch existing guardian
            guardian = guardianRepository.findById(guardianId)
                    .orElseThrow(() -> new ResourceNotFoundException("Guardian not found with ID: " + guardianId));
        }

        student.setGuardian(guardian);
        return studentRepository.save(student);
    }

    public Student updateStudent(Integer id, StudentCreateDTO studentCreateDTO) {
        Student student = studentRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Student not found with ID: " + id));

        User user = userRepository.findById(student.getUser().getId())
                .orElseThrow(() -> new ResourceNotFoundException("User not found with ID: " + id));

        // Update User model
        user.setFirstName(studentCreateDTO.getUserDetails().getFirstName());
        user.setLastName(studentCreateDTO.getUserDetails().getLastName());
        user.setGenderType(studentCreateDTO.getUserDetails().getGenderType());
        user.setAddress(studentCreateDTO.getUserDetails().getAddress());

        // Update Student model
        student.setDateOfBirth(studentCreateDTO.getDateOfBirth());
        student.setGradeType(studentCreateDTO.getGradeType());

        GuardianCreateDTO updateGuardian = studentCreateDTO.getGuardianDetails();

        // Update Guardian details
        guardianService.updateGuardian(updateGuardian.getId(),
                GuardianCreateDTO.builder()
                        .id(updateGuardian.getId())
                        .firstName(updateGuardian.getFirstName())
                        .lastName(updateGuardian.getLastName())
                        .email(updateGuardian.getEmail())
                        .nationalIdentityNumber(updateGuardian.getNationalIdentityNumber())
                        .contactNumber(updateGuardian.getContactNumber())
                        .relationship(updateGuardian.getRelationship())
                        .build());

        userRepository.save(user);
        return studentRepository.save(student);
    }

    public Student saveStudent(Student student) {
        return studentRepository.save(student);
    }

    private String generateStudentId() {
        String year = String.valueOf(Year.now().getValue()); // e.g., "2025"

        // Find the latest ID for the current year
        String maxId = studentRepository.findMaxStudentIdByYear(year);

        int nextSequence = 1; // Default if no records exist for the year

        if (maxId != null) {
            // Extract the numeric part (e.g., "001" from "ST/2025/001")
            String[] parts = maxId.split("/");
            String lastSeqStr = parts[2];
            nextSequence = Integer.parseInt(lastSeqStr) + 1;
        }

        // Format with leading zeros (e.g., 1 → "001")
        String sequencePart = String.format("%03d", nextSequence);

        return "ST/" + year + "/" + sequencePart;
    }

    public List<GradeStudentCountDTO> getStudentsCountInGrades() {
        return studentRepository.getGradeStudentCounts();
    }

    public Page<CourseListDTO> getStudentEnrolledCourses(Pageable pageable, Integer studentId) {
        Page<Enrollment> enrollmentPage = enrollmentRepository.findByStudentId(studentId, pageable);
        return enrollmentPage.map(enrollment -> new CourseListDTO(enrollment.getCourse()));
    }

    public void enableStudent(int studentId) {
        Student student = studentRepository.findById(studentId)
                .orElseThrow(() -> new ResourceNotFoundException("Student not found with ID: " + studentId));

        student.setActive(true);
        studentRepository.save(student);
    }

    public void disableStudent(int studentId) {
        Student student = studentRepository.findById(studentId)
                .orElseThrow(() -> new ResourceNotFoundException("Student not found with ID: " + studentId));

        student.setActive(false);
        studentRepository.save(student);
    }

    public void deleteStudent(Integer studentId) {
        Student student  = studentRepository.findById(studentId)
                .orElseThrow(() -> new ResourceNotFoundException("Student not found with ID: " + studentId));

        boolean isStudentUsedInExamResults = examResultRepository.existsByStudent(student);
        boolean isStudentUsedInEnrollments= enrollmentRepository.existsByStudent(student);

        if (isStudentUsedInExamResults) {
            throw new StudentInUseException("Student is linked to existing exam result and cannot be deleted.");
        }
        if (isStudentUsedInEnrollments) {
            throw new StudentInUseException("Student is linked to existing enrollment and cannot be deleted.");
        }

        studentRepository.deleteById(studentId);
    }
}
