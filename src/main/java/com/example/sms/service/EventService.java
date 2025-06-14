package com.example.sms.service;

import com.example.sms.dto.Event.EventCreateDTO;
import com.example.sms.dto.Event.EventUpdateDTO;
import com.example.sms.entity.Event;
import com.example.sms.exception.ResourceNotFoundException;
import com.example.sms.repository.EventRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

@Service
public class EventService {

    @Autowired
    private EventRepository eventRepository;

    public Page<Event> getPaginated(Pageable pageable, String search) {
        return eventRepository.findAll(pageable);
    }

    public Event getById(Integer id) {
        return eventRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Event not found"));
    }

    public Event create(EventCreateDTO createDTO) {
        Event event = new Event();
        event.setCode(createDTO.getCode());
        event.setEventType(createDTO.getEventType());
        event.setDate(createDTO.getDate());
        event.setStartTime(createDTO.getStartTime());
        event.setEndTime(createDTO.getEndTime());
        event.setReference(createDTO.getReference());

        return eventRepository.save(event);
    }

    public Event update(Integer id, EventUpdateDTO updateDTO) {
        Event event = eventRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Event not found."));

        event.setCode(updateDTO.getCode());
        event.setEventType(updateDTO.getEventType());
        event.setDate(updateDTO.getDate());
        event.setStartTime(updateDTO.getStartTime());
        event.setEndTime(updateDTO.getEndTime());
        event.setReference(updateDTO.getReference());

        return eventRepository.save(event);
    }

    public void patch() {
        //
    }

    public void delete() {
        //
    }
}
