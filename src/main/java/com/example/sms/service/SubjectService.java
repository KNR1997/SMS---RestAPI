package com.example.sms.service;

import com.example.sms.dto.SubjectDTO;
import com.example.sms.entity.Course;
import com.example.sms.entity.Subject;
import com.example.sms.repository.SubjectRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

@Service
public class SubjectService {

    @Autowired
    private SubjectRepository subjectRepository;

    public Page<Subject> getAllSubjects(Pageable pageable) {
        return subjectRepository.findAll(pageable);
    }

    public Subject createSubject(SubjectDTO subjectDTO) {
        Subject subject = new Subject();

        subject.setName(subjectDTO.getName());
        subject.setSlug(subjectDTO.getSlug());
        subject.setCode(subjectDTO.getCode());

        return subjectRepository.save(subject);
    }
}
