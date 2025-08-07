package com.example.sms.repository;

import com.example.sms.dto.Course.CourseStudentCountDTO;
import com.example.sms.dto.User.UserCountDTO;
import com.example.sms.entity.Course;
import com.example.sms.entity.Role;
import com.example.sms.entity.User;
import com.example.sms.enums.GradeType;
import com.example.sms.enums.RoleType;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface UserRepository extends JpaRepository<User, Integer> {

    User findByUsername(String username);

    Boolean existsByUsername(String username);

    boolean existsByEmail(String slug);

    Page<User> findByRole(Pageable pageable, Role role);

    @Query("SELECT u.role.name AS userName, COUNT(u.id) AS userCount " +
            "FROM User u " +
            "GROUP BY u.role.name")
    List<UserCountDTO> getUsersCount();

    @Query("SELECT u FROM User u " +
            "JOIN u.role r " +
            "WHERE (:name IS NULL OR LOWER(u.firstName) LIKE LOWER(CONCAT('%', :name, '%'))) " +
            "AND (:role IS NULL OR r.name = :role)")
    Page<User> searchUser(
            @Param("name") String name,
            @Param("role") RoleType role,
            Pageable pageable
    );

}
