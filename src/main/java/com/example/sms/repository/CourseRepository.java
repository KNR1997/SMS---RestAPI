package com.example.sms.repository;

import com.example.sms.entity.Course;
import com.example.sms.entity.Subject;
import com.example.sms.entity.User;
import com.example.sms.enums.GradeType;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;
import java.util.Optional;

public interface CourseRepository extends JpaRepository<Course, Integer>, JpaSpecificationExecutor<Course> {

    Optional<Course> findBySlug(String slug);

    boolean existsBySlug(String slug);

    boolean existsByCode(String code);

    Page<Course> findByGradeType(GradeType gradeType, Pageable pageable);

    List<Course> findByTeacher(User teacher);

    Page<Course> findByTeacher(User teacher, Pageable pageable);

    Page<Course> findByTeacherAndGradeType(User teacher, GradeType gradeType, Pageable pageable);

    @Query("SELECT c FROM Course c WHERE " +
            "(:is_active IS NULL OR c.active = :is_active) AND " +
            "(:name IS NULL OR LOWER(c.name) LIKE LOWER(CONCAT('%', :name, '%'))) AND " +
            "(:grade IS NULL OR c.gradeType = :grade)")
    Page<Course> searchCourses(
            @Param("name") String name,
            @Param("grade") GradeType grade,
            @Param("is_active") Boolean is_active,
            Pageable pageable
    );

    @Query("SELECT c FROM Course c " +
            "JOIN Enrollment e ON e.course = c " +
            "WHERE (:name IS NULL OR LOWER(c.name) LIKE LOWER(CONCAT('%', :name, '%'))) AND " +
            "(:grade IS NULL OR c.gradeType = :grade) AND " +
            "(:studentId IS NULL OR e.student.id = :studentId)")
    Page<Course> searchCoursesByStudentEnrollments(
            @Param("name") String name,
            @Param("grade") GradeType grade,
            @Param("studentId") Integer studentId,
            Pageable pageable
    );

    boolean existsBySubject(Subject subject);
    boolean existsByTeacher(User teacher);

}
