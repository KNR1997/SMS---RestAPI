package com.example.sms.service;

import com.example.sms.dto.EnrollmentPayment.EnrollmentPaymentCreateDTO;
import com.example.sms.dto.Payment.CoursePaymentCreateDTO;
import com.example.sms.dto.Payment.CoursePaymentItemDTO;
import com.example.sms.dto.Payment.PaymentCreateDTO;
import com.example.sms.dto.Payment.PaymentItemCreateDTO;
import com.example.sms.entity.Course;
import com.example.sms.entity.Enrollment;
import com.example.sms.entity.Payment;
import com.example.sms.entity.Student;
import com.example.sms.enums.EnrollmentStatusType;
import com.example.sms.enums.PayerType;
import com.example.sms.enums.PaymentType;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
public class CoursePaymentService {

    @Autowired
    private StudentService studentService;

    @Autowired
    private EnrollmentService enrollmentService;

    @Autowired
    private CourseService courseService;

    @Autowired
    private PaymentService paymentService;

    @Autowired
    private EnrollmentPaymentService enrollmentPaymentService;

    @Autowired
    private PaymentItemService paymentItemService;

    @Transactional
    public void createCoursePayment(CoursePaymentCreateDTO createDTO) {
        Double admission = createDTO.getAdmission();
        Student student = studentService.getStudentById(createDTO.getStudentId());

        // Create the Payment
        Payment payment = paymentService.createPayment(new PaymentCreateDTO(
                PayerType.STUDENT,
                student.getId(),
                PayerType.INSTITUTE,
                0,
                createDTO.getTotalAmount(),
                createDTO.getPaymentMethod(),
                null
        ));

        // If admission is paying
        if (admission > 0) {
            student.setAdmissionPayed(true);
            studentService.saveStudent(student);

            paymentItemService.createPaymentItem(new PaymentItemCreateDTO(
                    payment,
                    PaymentType.ADMISSION_FEE,
                    createDTO.getAdmission(),
                    "Student with id " + student.getStudentId() + "payed admission fee"
            ));
        }

        // Handle fees pay for course enrollments
        for (CoursePaymentItemDTO coursePaymentItemDTO : createDTO.getCoursePaymentList()) {
            Course course = courseService.getCourseById(coursePaymentItemDTO.getCourseId());
            Enrollment enrollment = enrollmentService.getEnrollmentsByStudentAndCourse(student, course);

            for (Integer monthNumber : coursePaymentItemDTO.getPaymentMonths()) {
                enrollmentPaymentService.createEnrollmentPayment(new EnrollmentPaymentCreateDTO(
                        enrollment,
                        monthNumber,
                        course.getFee(),
                        payment
                ));
                if (monthNumber > enrollment.getLastPaidMonth()) {
                    enrollment.setLastPaidMonth(monthNumber);
                    enrollment.setStatus(EnrollmentStatusType.ACTIVE);
                    enrollmentService.saveEnrollment(enrollment);
                }
                paymentItemService.createPaymentItem(new PaymentItemCreateDTO(
                        payment,
                        PaymentType.COURSE_FEE,
                        course.getFee(),
                        "Student with id" + student.getStudentId() + "payed monthly fee for course" + course.getName()
                ));
            }
        }
    }
}
