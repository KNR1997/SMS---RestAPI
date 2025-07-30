package com.example.sms.service;

import com.example.sms.dto.Hall.HallCreateDTO;
import com.example.sms.dto.Hall.HallUpdateDTO;
import com.example.sms.entity.Exam;
import com.example.sms.entity.Hall;
import com.example.sms.exception.HallInUseException;
import com.example.sms.exception.ResourceNotFoundException;
import com.example.sms.repository.EventHallAssignmentRepository;
import com.example.sms.repository.HallRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import static com.example.sms.utils.SearchUtil.extractSearchValue;

@Service
public class HallService {

    @Autowired
    private HallRepository hallRepository;

    @Autowired
    private EventHallAssignmentRepository eventHallAssignmentRepository;

    public Page<Hall> getPaginated(Pageable pageable, String search, Boolean is_active) {
        String name = extractSearchValue(search, "name");
        return hallRepository.searchHalls(name, is_active, pageable);
    }

    public Hall getById(Integer id) {
        return hallRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Hall not found"));
    }

    public Hall create(HallCreateDTO createDTO) {
        Hall hall = new Hall();
        hall.setName(createDTO.getName());
        hall.setExamCapacity(createDTO.getExamCapacity());
        hall.setLectureCapacity(createDTO.getLectureCapacity());

        return hallRepository.save(hall);
    }

    public Hall update(Integer id, HallUpdateDTO updateDTO) {
        Hall hall = hallRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Hall not found."));

        hall.setName(updateDTO.getName());
        hall.setExamCapacity(updateDTO.getExamCapacity());
        hall.setLectureCapacity(updateDTO.getLectureCapacity());

        return hallRepository.save(hall);
    }

    public void patch() {
        //
    }

    public void delete() {
        //
    }

    public void enableHall(int hallId) {
        Hall hall = hallRepository.findById(hallId)
                .orElseThrow(() -> new ResourceNotFoundException("Hall not found with ID: " + hallId));

        hall.setActive(true);
        hallRepository.save(hall);
    }

    public void disableHall(int hallId) {
        Hall hall = hallRepository.findById(hallId)
                .orElseThrow(() -> new ResourceNotFoundException("Hall not found with ID: " + hallId));

        hall.setActive(false);
        hallRepository.save(hall);
    }

    public void deleteHall(Integer hallId) {
        Hall hall = hallRepository.findById(hallId)
                .orElseThrow(() -> new ResourceNotFoundException("Hall not found with ID: " + hallId));

        boolean isHallUsedInEventHallAssignment = eventHallAssignmentRepository.existsByHall(hall);

        if (isHallUsedInEventHallAssignment) {
            throw new HallInUseException("Hall is linked to existing event and cannot be deleted.");
        }

        hallRepository.deleteById(hallId);
    }
}
