package com.example.sms.service;

import com.example.sms.dto.Hall.HallCreateDTO;
import com.example.sms.dto.Hall.HallUpdateDTO;
import com.example.sms.entity.Hall;
import com.example.sms.exception.ResourceNotFoundException;
import com.example.sms.repository.HallRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

@Service
public class HallService {

    @Autowired
    private HallRepository hallRepository;

    public Page<Hall> getPaginated(Pageable pageable, String search) {
        return hallRepository.findAll(pageable);
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

}
