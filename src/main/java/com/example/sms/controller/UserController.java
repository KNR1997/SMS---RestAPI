package com.example.sms.controller;

import com.example.sms.dto.CreateUserDTO;
import com.example.sms.dto.PaginatedResponse;
import com.example.sms.dto.UserDTO;
import com.example.sms.dto.UserPageDataDTO;
import com.example.sms.entity.ERole;
import com.example.sms.entity.Role;
import com.example.sms.entity.User;
import com.example.sms.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.net.URI;
import java.util.Set;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/users")
public class UserController {

    @Autowired
    private UserService userService;

    @GetMapping
    public ResponseEntity<PaginatedResponse<User>> getAllUsers(
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "10") int size,
            @RequestParam(defaultValue = "id") String sort,
            @RequestParam(defaultValue = "desc") String direction
    ) {
        Sort sortOrder = Sort.by(Sort.Direction.fromString(direction), sort);
        Pageable pageable = PageRequest.of(page, size, sortOrder);

        Page<User> userPage = userService.getAllUsers(pageable);

        PaginatedResponse<User> response = new PaginatedResponse<>(userPage);
        return ResponseEntity.ok(response);
    }

    @PostMapping
    public ResponseEntity<User> createUser(@RequestBody CreateUserDTO createUserDTO) {
        User user = userService.createUser(createUserDTO);
        URI location = URI.create("/users/" + user.getId()); // assuming course has getSlug()
        return ResponseEntity.created(location).body(user);
    }

    @GetMapping("/{id}")
    public ResponseEntity<?> getUserById(@PathVariable Integer id) {
        User user = userService.getUserById(id);

        // Convert roles to a set of role names
        Set<ERole> roleNames = user.getRoles()
                .stream()
                .map(Role::getName) // Assuming getName() returns something like "ROLE_USER"
                .collect(Collectors.toSet());


        UserPageDataDTO userPageDataDTO = new UserPageDataDTO(
                user.getId(),
                user.getFirstName(),
                user.getLastName(),
                user.getEmail(),
                user.getUsername(),
                roleNames
        );

        return ResponseEntity.ok(userPageDataDTO);
    }

    @PutMapping("/{id}")
    public ResponseEntity<UserPageDataDTO> updateUser(@PathVariable Integer id, @RequestBody UserDTO updateDto) {
        User user = userService.updateUser(id, updateDto);

        // Convert roles to a set of role names
        Set<ERole> roleNames = user.getRoles()
                .stream()
                .map(Role::getName) // Assuming getName() returns something like "ROLE_USER"
                .collect(Collectors.toSet());

        UserPageDataDTO userPageDataDTO = new UserPageDataDTO(
                user.getId(),
                user.getFirstName(),
                user.getLastName(),
                user.getEmail(),
                user.getUsername(),
                roleNames
        );

        return ResponseEntity.ok(userPageDataDTO);
    }

}
