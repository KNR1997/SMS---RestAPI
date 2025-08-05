package com.example.sms.service;


import com.example.sms.dto.ChangePasswordDTO;
import com.example.sms.dto.User.UserCreateDTO;
import com.example.sms.dto.User.UserListDTO;
import com.example.sms.entity.Role;
import com.example.sms.entity.User;
import com.example.sms.enums.RoleType;
import com.example.sms.exception.BadRequestException;
import com.example.sms.exception.ResourceNotFoundException;
import com.example.sms.exception.UserInUserException;
import com.example.sms.repository.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.Objects;

import static com.example.sms.utils.SearchUtil.extractSearchValue;

@Service
public class UserService {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private PasswordEncoder encoder;

    @Autowired
    private RoleRepository roleRepository;

    @Autowired
    private CourseRepository courseRepository;

    @Autowired
    private EmployeePaymentRepository employeePaymentRepository;

    @Autowired
    private StudentRepository studentRepository;

    public Page<UserListDTO> getUsersPaginated(Pageable pageable, String roleType, String search) {
        RoleType role = roleType != null ? RoleType.valueOf(roleType.toUpperCase()) : null;
        String name = extractSearchValue(search, "name");

        Page<User> userPage = userRepository.searchUser(name, role, pageable);

        return userPage.map(UserListDTO::new);
    }

    public User getUserById(Integer id) {
        return userRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("User not found with id: " + id));
    }

    public User createUser(UserCreateDTO userCreateDTO) {
//        if (userRepository.existsByEmail(userCreateDTO.getEmail())) {
//            throw new BadRequestException("User with email '" + userCreateDTO.getEmail() + "' already exists.");
//        }

        Role role = roleRepository.findByName(userCreateDTO.getRole())
                .orElseThrow(() -> new ResourceNotFoundException("Role not found for:" + userCreateDTO.getRole()));

        User user = new User();
        user.setFirstName(userCreateDTO.getFirstName());
        user.setLastName(userCreateDTO.getLastName());
        user.setUsername(userCreateDTO.getUsername());
        user.setRole(role);
        user.setAddress(userCreateDTO.getAddress());
        user.setGenderType(userCreateDTO.getGenderType());
        user.setPassword(encoder.encode(userCreateDTO.getPassword()));
        user.setEmail(userCreateDTO.getEmail());
        user.setNic(userCreateDTO.getNic());

        return userRepository.save(user);
    }

    public User updateUser(Integer id, UserCreateDTO updateDto) {
        User user = userRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("User not found with ID: " + id));

        if (!Objects.equals(user.getEmail(), updateDto.getEmail())) {
            if (userRepository.existsByEmail(updateDto.getEmail())) {
                throw new BadRequestException("User with email '" + updateDto.getEmail() + "' already exists.");
            }
        }

        Role role = roleRepository.findByName(updateDto.getRole())
                .orElseThrow(() -> new ResourceNotFoundException("Role not found for:" + updateDto.getRole()));

        user.setFirstName(updateDto.getFirstName());
        user.setLastName(updateDto.getLastName());
        user.setEmail(updateDto.getEmail());
        user.setUsername(updateDto.getUsername());
        user.setRole(role);
        user.setEmail(updateDto.getEmail());
        user.setNic(updateDto.getNic());
        user.setPhoneNumber(updateDto.getPhoneNumber());

        // Only update password if a new one is provided (optional, but recommended)
        if (updateDto.getPassword() != null && !updateDto.getPassword().isEmpty()) {
            user.setPassword(encoder.encode(updateDto.getPassword()));
        }

        return userRepository.save(user);
    }

    public User patch(Integer id, UserCreateDTO updateDto) {
        User user = userRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("User not found with ID: " + id));

        if (updateDto.getEmail() != null && !Objects.equals(user.getEmail(), updateDto.getEmail())) {
            if (userRepository.existsByEmail(updateDto.getEmail())) {
                throw new BadRequestException("User with email '" + updateDto.getEmail() + "' already exists.");
            }
            user.setEmail(updateDto.getEmail());
        }

        if (updateDto.getFirstName() != null) {
            user.setFirstName(updateDto.getFirstName());
        }

        if (updateDto.getLastName() != null) {
            user.setLastName(updateDto.getLastName());
        }

        if (updateDto.getUsername() != null) {
            user.setUsername(updateDto.getUsername());
        }

        if (updateDto.getNic() != null) {
            user.setNic(updateDto.getNic());
        }

        if (updateDto.getPhoneNumber() != null) {
            user.setPhoneNumber(updateDto.getPhoneNumber());
        }

        if (updateDto.getPassword() != null && !updateDto.getPassword().isEmpty()) {
            user.setPassword(encoder.encode(updateDto.getPassword()));
        }

        // Intentionally skipping updateDto.getRole() to prevent role change

        return userRepository.save(user);
    }

    public User resetUserPassword(Integer id) {
        User user = userRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("User not found with ID: " + id));
        user.setPassword(encoder.encode("123456"));
        return userRepository.save(user);

    }

    public void enableUser(int courseId) {
        User user = userRepository.findById(courseId)
                .orElseThrow(() -> new ResourceNotFoundException("Course not found with ID: " + courseId));

        user.setActive(true);
        userRepository.save(user);
    }

    public void disableUser(int courseId) {
        User user = userRepository.findById(courseId)
                .orElseThrow(() -> new ResourceNotFoundException("Course not found with ID: " + courseId));

        user.setActive(false);
        userRepository.save(user);
    }

    public void deleteUser(Integer userId) {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new ResourceNotFoundException("Course not found with ID: " + userId));

        boolean isUserUsedInCourses = courseRepository.existsByTeacher(user);
        boolean isUserUsedInEmployeePayments = employeePaymentRepository.existsByEmployee(user);
        boolean isUserUsedInStudents = studentRepository.existsByUser(user);

        if (isUserUsedInCourses) {
            throw new UserInUserException("User is linked to existing course and cannot be deleted.");
        }
        if (isUserUsedInEmployeePayments) {
            throw new UserInUserException("User is linked to existing employee payment and cannot be deleted.");
        }
        if (isUserUsedInStudents) {
            throw new UserInUserException("User is linked to existing student and cannot be deleted.");
        }

        userRepository.deleteById(userId);
    }

    public User changePassword(User currentUser, ChangePasswordDTO changePasswordDTO) {
        User user = userRepository.findById(currentUser.getId())
                .orElseThrow(() -> new ResourceNotFoundException("User not found with ID: " + currentUser.getId()));

        // Check if old password matches
        if (!encoder.matches(changePasswordDTO.getOldPassword(), user.getPassword())) {
            throw new BadRequestException("Old password is incorrect");
        }

        // Set the new password
        user.setPassword(encoder.encode(changePasswordDTO.getNewPassword()));
        return userRepository.save(user);
    }
}
