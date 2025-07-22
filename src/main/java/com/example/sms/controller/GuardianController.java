package com.example.sms.controller;

import com.example.sms.dto.Guardian.GuardianCreateDTO;
import com.example.sms.dto.Guardian.GuardianDetailDTO;
import com.example.sms.dto.Guardian.GuardianListDTO;
import com.example.sms.dto.PaginatedResponse;
import com.example.sms.entity.Guardian;
import com.example.sms.service.GuardianService;
import io.swagger.v3.oas.annotations.security.SecurityRequirement;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

@RestController
@CrossOrigin
@RequestMapping("/api/guardians")
@SecurityRequirement(name = "bearerAuth")
public class GuardianController {

    @Autowired
    private GuardianService guardianService;

    @GetMapping
    public ResponseEntity<PaginatedResponse<GuardianListDTO>> getAllGuardians(
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "10") int size,
            @RequestParam(defaultValue = "id") String sort,
            @RequestParam(defaultValue = "desc") String direction,
            @RequestParam(required = false) String search
    ) {
        Sort sortOrder = Sort.by(Sort.Direction.fromString(direction), sort);
        Pageable pageable = PageRequest.of(page, size, sortOrder);

        Page<GuardianListDTO> guardianPage = guardianService.getGuardiansPaginated(
                pageable,
                search
        );

        PaginatedResponse<GuardianListDTO> response = new PaginatedResponse<>(guardianPage);
        return ResponseEntity.ok(response);
    }

    @GetMapping("/{id}")
    public ResponseEntity<GuardianDetailDTO> getGuardianByIdentityNumber(@PathVariable Integer id) {
        Guardian guardian = guardianService.getGuardianById(id);
        GuardianDetailDTO guardianDetailDTO = new GuardianDetailDTO(guardian);
        return ResponseEntity.ok(guardianDetailDTO);
    }

    @GetMapping("/by-identityNumber/{identityNumber}")
    public ResponseEntity<GuardianDetailDTO> getGuardianByIdentityNumber(@PathVariable String identityNumber) {
        Guardian guardian = guardianService.getGuardianByIdentityNumber(identityNumber);
        GuardianDetailDTO guardianDetailDTO = new GuardianDetailDTO(guardian);
        return ResponseEntity.ok(guardianDetailDTO);
    }

    @PreAuthorize("hasRole('ROLE_ADMIN')")
    @PutMapping("/{id}")
    public ResponseEntity<Void> updateGuardian(@PathVariable Integer id, @RequestBody GuardianCreateDTO updateDto) {
        guardianService.updateGuardian(id, updateDto);
        return ResponseEntity.noContent().build();
    }
}
