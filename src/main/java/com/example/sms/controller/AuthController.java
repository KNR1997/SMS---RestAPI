package com.example.sms.controller;

import com.example.sms.dto.*;
import com.example.sms.dto.request.LoginRequest;
import com.example.sms.dto.request.RegisterRequest;
import com.example.sms.dto.response.AuthResponse;
import com.example.sms.dto.response.RegisterResponse;
import com.example.sms.entity.*;
import com.example.sms.enums.RoleType;
import com.example.sms.enums.GradeType;
import com.example.sms.repository.RoleRepository;
import com.example.sms.repository.StudentRepository;
import com.example.sms.repository.UserRepository;
import com.example.sms.security.JwtUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

import java.util.Optional;

@RestController
@RequestMapping("/api/auth")
public class AuthController {

    @Autowired
    private AuthenticationManager authenticationManager;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private RoleRepository roleRepository;

    @Autowired
    private JwtUtils jwtUtils;

    @Autowired
    private PasswordEncoder encoder;

    @Autowired
    private StudentRepository studentRepository;


    @PostMapping("/login/")
    public ResponseEntity<?> login(@RequestBody LoginRequest loginRequest) {
        Authentication authentication = authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(loginRequest.getUsername(), loginRequest.getPassword()));

        SecurityContextHolder.getContext().setAuthentication(authentication);
        String jwt = jwtUtils.generateJwtToken((UserDetails) authentication.getPrincipal());

        return ResponseEntity.ok(new AuthResponse(jwt));
    }

    @PostMapping("/register")
    public ResponseEntity<?> registerUser(@RequestBody RegisterRequest signUpRequest) {
        if (userRepository.existsByUsername(signUpRequest.getUsername())) {
            return ResponseEntity.badRequest().body("Error: Username is already taken!");
        }

        Role adminRole = roleRepository.findByName(RoleType.ROLE_ADMIN)
                .orElseThrow(() -> new RuntimeException("Error: Role is not found."));


        User user = new User();
        user.setUsername(signUpRequest.getUsername());
        user.setEmail(signUpRequest.getEmail());
        user.setPassword(encoder.encode(signUpRequest.getPassword()));
        user.setRole(adminRole);

        userRepository.save(user);
        return ResponseEntity.ok(new RegisterResponse(user));
    }

    @GetMapping("/me")
    public ResponseEntity<?> getCurrentUser(@RequestHeader("Authorization") String authHeader) {
        if (authHeader == null || !authHeader.startsWith("Bearer ")) {
            return ResponseEntity.status(401).body("Missing or invalid Authorization header");
        }

        String token = authHeader.substring(7); // remove "Bearer "
        String username = jwtUtils.getUserNameFromJwtToken(token);

        User user = userRepository.findByUsername(username);
        if (user == null) {
            return ResponseEntity.status(404).body("User not found");
        }

        GradeType studentGradeType = null;
        Integer studentId = null;
        Optional<Student> student = studentRepository.findByUser_Id(user.getId());
        if (student.isPresent()) {
            studentGradeType = student.get().getGradeType();
            studentId = student.get().getId();
        }

        // Map User to MeDTO
        MeDTO meDTO = new MeDTO(
                user.getFirstName(),
                user.getLastName(),
                user.getUsername(),
                user.getEmail(),
                user.getRole().getName(),
                studentGradeType,
                studentId);
        return ResponseEntity.ok(meDTO); // You might want to return a DTO instead of the full User entity
    }

}
