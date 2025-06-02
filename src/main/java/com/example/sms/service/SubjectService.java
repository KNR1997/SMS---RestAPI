package com.example.sms.service;

import com.example.sms.dto.SubjectDTO;
import com.example.sms.entity.Subject;
import com.example.sms.repository.SubjectRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class SubjectService {

    @Autowired
    private SubjectRepository subjectRepository;

    public Subject createSubject(SubjectDTO subjectDTO) {
        Subject subject = new Subject();

        subject.setName(subjectDTO.getName());
        subject.setSlug(subjectDTO.getSlug());

        return subjectRepository.save(subject);
    }
}
