package com.example.sms.controller;

import com.example.sms.dto.Event.EventCreateDTO;
import com.example.sms.dto.Event.EventUpdateDTO;
import com.example.sms.dto.PaginatedResponse;
import com.example.sms.dto.response.Event.EventPageDataResponse;
import com.example.sms.dto.response.Event.EventPaginatedDataResponse;
import com.example.sms.service.EventService;
import io.swagger.v3.oas.annotations.security.SecurityRequirement;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@CrossOrigin
@RequestMapping("/api/events")
@SecurityRequirement(name = "bearerAuth")
public class EventController {

    @Autowired
    private EventService eventService;

    @GetMapping
    public ResponseEntity<PaginatedResponse<EventPaginatedDataResponse>> getEventsPaginated(
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "10") int size,
            @RequestParam(defaultValue = "id") String sort,
            @RequestParam(defaultValue = "desc") String direction,
            @RequestParam(required = false) String search,
            @RequestParam(required = false) String grade
    ) {
        Sort sortOrder = Sort.by(Sort.Direction.fromString(direction), sort);
        Pageable pageable = PageRequest.of(page, size, sortOrder);

        Page<EventPaginatedDataResponse> eventPage = eventService.getPaginated(pageable, search);

        PaginatedResponse<EventPaginatedDataResponse> response = new PaginatedResponse<>(eventPage);
        return ResponseEntity.ok(response);
    }

    @GetMapping("/{id}")
    public ResponseEntity<EventPageDataResponse> getEventById(@PathVariable Integer id) {
        EventPageDataResponse eventPageDataResponse = eventService.getEventPageData(id);
        return ResponseEntity.ok(eventPageDataResponse);
    }

    @PostMapping
    public ResponseEntity<Void> createEvent(@RequestBody EventCreateDTO createDto) {
        eventService.create(createDto);
        return ResponseEntity.noContent().build();
    }

    @PutMapping("/{id}")
    public ResponseEntity<Void> updateEvent(@PathVariable Integer id, @RequestBody EventUpdateDTO updateDto) {
        eventService.update(id, updateDto);
        return ResponseEntity.noContent().build();
    }
}
