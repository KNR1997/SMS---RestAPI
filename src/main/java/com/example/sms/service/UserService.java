package com.example.sms.service;


import com.example.sms.dto.CreateUserDTO;
import com.example.sms.dto.UserDTO;
import com.example.sms.entity.Role;
import com.example.sms.entity.User;
import com.example.sms.exception.BadRequestException;
import com.example.sms.exception.ResourceNotFoundException;
import com.example.sms.repository.RoleRepository;
import com.example.sms.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.HashSet;
import java.util.Set;

@Service
public class UserService {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private PasswordEncoder encoder;

    @Autowired
    private RoleRepository roleRepository;

    public Page<User> getAllUsers(Pageable pageable) {
        return userRepository.findAll(pageable);
    }

    public User getUserById(Integer id) {
        return userRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("User not found with id: " + id));
    }

    public User createUser(CreateUserDTO createUserDTO) {
        if (userRepository.existsByEmail(createUserDTO.getEmail())) {
            throw new BadRequestException("User with email '" + createUserDTO.getEmail() + "' already exists.");
        }

        User user = new User();
        user.setFirstName(createUserDTO.getFirstName());
        user.setLastName(createUserDTO.getLastName());
        user.setEmail(createUserDTO.getEmail());
        user.setUsername(createUserDTO.getUsername());
        user.setPassword(encoder.encode(createUserDTO.getPassword()));

        Set<Role> roles = new HashSet<>();
        Role userRole = roleRepository.findByName(createUserDTO.getRole())
                .orElseThrow(() -> new RuntimeException("Error: Role is not found."));
        roles.add(userRole);
        user.setRoles(roles);

        return userRepository.save(user);
    }

    public User updateUser(Integer id, UserDTO updateDto) {
        User user = userRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Course not found with ID: " + id));

        user.setFirstName(updateDto.getFirstName());
        user.setLastName(updateDto.getLastName());
        user.setEmail(updateDto.getEmail());
        user.setUsername(updateDto.getUsername());

        // Only update password if a new one is provided (optional, but recommended)
        if (updateDto.getPassword() != null && !updateDto.getPassword().isEmpty()) {
            user.setPassword(encoder.encode(updateDto.getPassword()));
        }

        // Update role
        Set<Role> roles = new HashSet<>();
        Role newRole = roleRepository.findByName(updateDto.getRole())
                .orElseThrow(() -> new RuntimeException("Error: Role is not found."));
        roles.add(newRole);
        user.setRoles(roles);

        return userRepository.save(user);
    }

}
