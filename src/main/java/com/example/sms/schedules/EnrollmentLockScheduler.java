package com.example.sms.schedules;

import com.example.sms.entity.Enrollment;
import com.example.sms.enums.EnrollmentStatusType;
import com.example.sms.repository.EnrollmentRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.List;

@Service
public class EnrollmentLockScheduler {

    private static final Logger logger = LoggerFactory.getLogger(EnrollmentLockScheduler.class);
    private final EnrollmentRepository enrollmentRepository;

    public EnrollmentLockScheduler(EnrollmentRepository enrollmentRepository) {
        this.enrollmentRepository = enrollmentRepository;
    }

    // This runs at 12:01 AM on the first day of every month
    @Scheduled(cron = "0 1 0 1 * *") // every month
//    @Scheduled(cron = "0 */2 * * * *") // every 2 minutes
    public void lockAllEnrollmentsAtStartOfMonth() {
        List<Enrollment> enrollments = enrollmentRepository.findAllByActiveTrue(); // or just findAll()
        for (Enrollment enrollment : enrollments) {
            if(enrollment.getLastPaidMonth() < setCurrentMonthToNow()) {
                enrollment.setStatus(EnrollmentStatusType.LOCKED);
            }
        }
        enrollmentRepository.saveAll(enrollments);
//        System.out.println("Locked all enrollments at the start of the month: " + LocalDate.now());
        logger.info("Locked {} enrollments at {}", enrollments.size(), LocalDate.now());
    }

    public int setCurrentMonthToNow() {
        return LocalDate.now().getMonthValue(); // returns 1-12
    }
}
