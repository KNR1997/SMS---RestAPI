package com.example.sms.service;

import com.example.sms.dto.Event.EventCreateDTO;
import com.example.sms.dto.Event.EventUpdateDTO;
import com.example.sms.dto.response.Event.EventPageDataResponse;
import com.example.sms.dto.response.Event.EventPaginatedDataResponse;
import com.example.sms.entity.Course;
import com.example.sms.entity.Event;
import com.example.sms.entity.EventHallAssignment;
import com.example.sms.entity.Hall;
import com.example.sms.enums.EventStatusType;
import com.example.sms.exception.ResourceNotFoundException;
import com.example.sms.repository.CourseRepository;
import com.example.sms.repository.EventHallAssignmentRepository;
import com.example.sms.repository.EventRepository;
import com.example.sms.repository.HallRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.HashSet;
import java.util.List;
import java.util.Set;
import java.util.stream.Collectors;

@Service
public class EventService {

    @Autowired
    private EventRepository eventRepository;

    @Autowired
    private EventHallAssignmentRepository eventHallAssignmentRepository;

    @Autowired
    private HallRepository hallRepository;

    @Autowired
    private CourseRepository courseRepository;

    public Page<EventPaginatedDataResponse> getPaginated(Pageable pageable, String search) {
        Page<Event> events = eventRepository.findAll(pageable);

        return events.map(event -> {
            List<Hall> halls = eventHallAssignmentRepository.findByEvent(event)
                    .stream()
                    .map(EventHallAssignment::getHall)
                    .collect(Collectors.toList());
            return new EventPaginatedDataResponse(event, halls);
        });
    }

    public EventPageDataResponse getEventPageData(Integer eventId) {
        Event event = eventRepository.findById(eventId)
                .orElseThrow(() -> new RuntimeException("Event not found"));

        List<Hall> halls = eventHallAssignmentRepository.findByEvent(event)
                .stream()
                .map(EventHallAssignment::getHall)
                .collect(Collectors.toList());

        return new EventPageDataResponse(event, halls);
    }

    public Event getById(Integer id) {
        return eventRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Event not found"));
    }

    @Transactional
    public Event create(EventCreateDTO createDTO) {
        Course course = courseRepository.findById(createDTO.getCourseId())
                .orElseThrow(() -> new RuntimeException("Course not found"));

        Event event = new Event();
        event.setCode(createDTO.getCode());
        event.setCourse(course);
        event.setEventType(createDTO.getEventType());
        event.setDate(createDTO.getDate());
        event.setStartTime(createDTO.getStartTime());
        event.setEndTime(createDTO.getEndTime());
        event.setReference(createDTO.getReference());
        event.setStatus(EventStatusType.PENDING);

        for (Integer hallId : createDTO.getHallIds()) {
            Hall hall = hallRepository.findById(hallId)
                    .orElseThrow(() -> new RuntimeException("Hall not found"));
            EventHallAssignment eventHallAssignment1 = new EventHallAssignment();
            eventHallAssignment1.setEvent(event);
            eventHallAssignment1.setHall(hall);
            eventHallAssignmentRepository.save(eventHallAssignment1);
        }

        return eventRepository.save(event);
    }

    public Event update(Integer id, EventUpdateDTO updateDTO) {
        Event event = eventRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Event not found."));

        // 1. Update basic fields
        event.setCode(updateDTO.getCode());
        event.setEventType(updateDTO.getEventType());
        event.setDate(updateDTO.getDate());
        event.setStartTime(updateDTO.getStartTime());
        event.setEndTime(updateDTO.getEndTime());
        event.setReference(updateDTO.getReference());

        // 2. Get current assignments
        List<EventHallAssignment> existingAssignments = eventHallAssignmentRepository.findByEvent(event);

        // 3. Create a Set of incoming hall IDs
        Set<Integer> incomingHallIds = new HashSet<>(updateDTO.getHallIds());

        // 4. Remove outdated assignments
        for (EventHallAssignment assignment : existingAssignments) {
            if (!incomingHallIds.contains(assignment.getHall().getId())) {
                eventHallAssignmentRepository.delete(assignment);
            }
        }

        // 5. Get updated list of existing assignments after removals
        Set<Integer> existingHallIds = eventHallAssignmentRepository.findByEvent(event)
                .stream()
                .map(a -> a.getHall().getId())
                .collect(Collectors.toSet());

        // 6. Add new assignments
        for (Integer hallId : incomingHallIds) {
            if (!existingHallIds.contains(hallId)) {
                Hall hall = hallRepository.findById(hallId)
                        .orElseThrow(() -> new RuntimeException("Hall not found"));
                EventHallAssignment newAssignment = new EventHallAssignment();
                newAssignment.setEvent(event);
                newAssignment.setHall(hall);
                eventHallAssignmentRepository.save(newAssignment);
            }
        }

        // 7. Save and return the updated event
        return eventRepository.save(event);
    }

    public void patch() {
        //
    }

    public void delete() {
        //
    }
}
