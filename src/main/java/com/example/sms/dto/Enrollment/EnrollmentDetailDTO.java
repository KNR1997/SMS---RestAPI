package com.example.sms.dto.Enrollment;

import com.example.sms.dto.Course.CourseDetailDTO;
import com.example.sms.dto.EnrollmentPayment.EnrollmentPaymentDetailDTO;
import com.example.sms.entity.Enrollment;
import com.example.sms.entity.EnrollmentPayment;
import lombok.Data;

import java.text.DateFormatSymbols;
import java.util.Date;
import java.util.List;
import java.util.stream.Collectors;

@Data
public class EnrollmentDetailDTO {

    private int id;

    private String firstName;

    private String lastName;

    private String studentId;

    private Date dateOfBirth;

    private Boolean admissionPayed;

    private Integer lastPaidMonth;

    private CourseDetailDTO courseDetails;

    private List<EnrollmentPaymentDetailDTO> enrollmentPayments;

    public EnrollmentDetailDTO(Enrollment enrollment, List<EnrollmentPayment> enrollmentPayments) {
        this.id = enrollment.getId();
        this.firstName = enrollment.getStudent().getUser().getFirstName();
        this.lastName = enrollment.getStudent().getUser().getLastName();
        this.studentId = enrollment.getStudent().getStudentId();
        this.dateOfBirth = enrollment.getStudent().getDateOfBirth();
        this.admissionPayed = enrollment.getStudent().getAdmissionPayed();
        this.lastPaidMonth = enrollment.getLastPaidMonth();
        this.courseDetails = new CourseDetailDTO(enrollment.getCourse());

        // Map the EnrollmentPayment entities to DTOs
        this.enrollmentPayments = enrollmentPayments.stream()
                .map(EnrollmentPaymentDetailDTO::new)
                .collect(Collectors.toList());
    }

    public EnrollmentDetailDTO(Enrollment enrollment) {
        this.id = enrollment.getId();
    }

    public String getLastPaidMonthName() {
        if (lastPaidMonth == null || lastPaidMonth == 0) {
            return "_";
        }
        // Month index is 1-based (1 = January, 12 = December)
        return new DateFormatSymbols().getMonths()[lastPaidMonth - 1];
    }
}
