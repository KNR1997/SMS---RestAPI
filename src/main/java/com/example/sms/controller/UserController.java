package com.example.sms.controller;

import com.example.sms.dto.User.UserCreateDTO;
import com.example.sms.dto.PaginatedResponse;
import com.example.sms.dto.User.UserDetailDTO;
import com.example.sms.dto.User.UserListDTO;
import com.example.sms.entity.Role;
import com.example.sms.entity.User;
import com.example.sms.enums.RoleType;
import com.example.sms.service.UserService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.net.URI;

@RestController
@RequestMapping("/api/users")
public class UserController {

    @Autowired
    private UserService userService;

    @GetMapping
    public ResponseEntity<PaginatedResponse<UserListDTO>> getAllUsers(
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "10") int size,
            @RequestParam(defaultValue = "id") String sort,
            @RequestParam(defaultValue = "desc") String direction,
            @RequestParam(required = false) RoleType role
    ) {
        Sort sortOrder = Sort.by(Sort.Direction.fromString(direction), sort);
        Pageable pageable = PageRequest.of(page, size, sortOrder);

        Page<UserListDTO> userPage = userService.getUsersPaginated(pageable, role);

        PaginatedResponse<UserListDTO> response = new PaginatedResponse<>(userPage);
        return ResponseEntity.ok(response);
    }

    @PostMapping
    public ResponseEntity<Void> createUser(@RequestBody UserCreateDTO userCreateDTO) {
        User user = userService.createUser(userCreateDTO);
        URI location = URI.create("/users/" + user.getId()); // assuming course has getSlug()
        return ResponseEntity.created(location).build();
    }

    @GetMapping("/{id}")
    public ResponseEntity<UserDetailDTO> getUserById(@PathVariable Integer id) {
        User user = userService.getUserById(id);
        UserDetailDTO userDetailDTO = new UserDetailDTO(user);
        return ResponseEntity.ok(userDetailDTO);
    }

    @PutMapping("/{id}")
    public ResponseEntity<Void> updateUser(@PathVariable Integer id, @RequestBody @Valid UserCreateDTO updateDto) {
        userService.updateUser(id, updateDto);
        return ResponseEntity.noContent().build();
    }

    @PutMapping("/{id}/reset-password")
    public ResponseEntity<Void> resetUserPassword(@PathVariable Integer id) {
        User user = userService.resetUserPassword(id);
        URI location = URI.create("/users/" + user.getId()); // assuming course has getSlug()
        return ResponseEntity.created(location).build();
    }


}
