package com.example.sms.service;

import com.example.sms.dto.Report.InstituteMonthlyIncomeDTO;
import com.example.sms.dto.Student.StudentListDTO;
import com.example.sms.entity.Course;
import com.example.sms.entity.Student;
import com.example.sms.entity.User;
import com.example.sms.enums.GradeType;
import com.example.sms.enums.RoleType;
import com.example.sms.exception.ResourceNotFoundException;
import com.example.sms.repository.PaymentRepository;
import com.example.sms.repository.StudentRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.util.List;

import static com.example.sms.utils.SearchUtil.extractSearchValue;

@Service
public class ReportService {
    @Autowired
    private PaymentRepository paymentRepository;

    @Autowired
    private StudentRepository studentRepository;

    public List<InstituteMonthlyIncomeDTO> getInstituteMonthlyIncome() {
        return paymentRepository.getInstituteMonthlyIncome();
    }

    public Page<StudentListDTO> getMonthlyActiveStudentsPaginated(
            Pageable pageable,
            String search,
            String grade,
            Boolean admissionPayed,
            User currentUser,
            Boolean is_active
    ) {
        String name = extractSearchValue(search, "name");
        GradeType gradeType = grade != null ? GradeType.valueOf(grade.toUpperCase()) : null;
        Page<Student> studentPage = studentRepository.searchStudent(name, gradeType, admissionPayed, is_active, pageable);;

        assert studentPage != null;
        return studentPage.map(StudentListDTO::new);
    }

}
