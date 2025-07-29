package com.example.sms.controller;

import com.example.sms.dto.Hall.HallCreateDTO;
import com.example.sms.dto.Hall.HallUpdateDTO;
import com.example.sms.dto.PaginatedResponse;
import com.example.sms.dto.response.Hall.HallPageDataResponse;
import com.example.sms.dto.response.Hall.HallPaginatedDataResponse;
import com.example.sms.entity.Hall;
import com.example.sms.service.HallService;
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
@RequestMapping("/api/halls")
@SecurityRequirement(name = "bearerAuth")
public class HallController {

    @Autowired
    private HallService hallService;

    @GetMapping
    public ResponseEntity<PaginatedResponse<HallPaginatedDataResponse>> getHallsPaginated(
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "10") int size,
            @RequestParam(defaultValue = "id") String sort,
            @RequestParam(defaultValue = "desc") String direction,
            @RequestParam(required = false) String search,
            @RequestParam(required = false) String grade
    ) {
        Sort sortOrder = Sort.by(Sort.Direction.fromString(direction), sort);
        Pageable pageable = PageRequest.of(page, size, sortOrder);

        Page<Hall> hallPage = hallService.getPaginated(pageable, search);

        PaginatedResponse<HallPaginatedDataResponse> response = new PaginatedResponse<>(hallPage.map(HallPaginatedDataResponse::new));
        return ResponseEntity.ok(response);
    }

    @GetMapping("/{id}")
    public ResponseEntity<HallPageDataResponse> getHallById(@PathVariable Integer id) {
        Hall hall = hallService.getById(id);
        HallPageDataResponse hallPageDataResponse = new HallPageDataResponse(hall);
        return ResponseEntity.ok(hallPageDataResponse);
    }

    @PostMapping
    public ResponseEntity<Void> createHall(@RequestBody HallCreateDTO createDto) {
        hallService.create(createDto);
        return ResponseEntity.noContent().build();
    }

    @PutMapping("/{id}")
    public ResponseEntity<Void> updateHall(@PathVariable Integer id, @RequestBody HallUpdateDTO updateDto) {
        hallService.update(id, updateDto);
        return ResponseEntity.noContent().build();
    }

    @PutMapping("/{id}/enable")
    public ResponseEntity<Void> enableHall(@PathVariable Integer id) {
        hallService.enableHall(id);
        return ResponseEntity.noContent().build();
    }

    @PutMapping("/{id}/disable")
    public ResponseEntity<Void> disableHall(@PathVariable Integer id) {
        hallService.disableHall(id);
        return ResponseEntity.noContent().build();
    }

    @PreAuthorize("hasRole('ROLE_ADMIN')")
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteHall(@PathVariable Integer id) {
        hallService.deleteHall(id);
        return ResponseEntity.noContent().build();
    }
}
