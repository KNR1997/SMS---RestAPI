package com.example.sms.service;

import com.example.sms.dto.Guardian.GuardianListDTO;
import com.example.sms.dto.Subject.SubjectCreateDTO;
import com.example.sms.dto.Subject.SubjectListDTO;
import com.example.sms.entity.Subject;
import com.example.sms.exception.AppsException;
import com.example.sms.exception.ResourceNotFoundException;
import com.example.sms.exception.SubjectInUseException;
import com.example.sms.repository.CourseRepository;
import com.example.sms.repository.SubjectRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.PathVariable;

import static com.example.sms.utils.SearchUtil.extractSearchValue;

@Service
public class SubjectService {

    @Autowired
    private SubjectRepository subjectRepository;

    @Autowired
    private CourseRepository courseRepository;

    public Page<SubjectListDTO> getSubjectsPaginated(
            Pageable pageable,
            String search,
            Boolean is_active
    )
    {
        String name = extractSearchValue(search, "name");
        Page<Subject> subjectPage = subjectRepository.searchSubjects(name, is_active, pageable);

        return subjectPage.map(SubjectListDTO::new);
    }

    public Subject getSubjectBySlug(@PathVariable String slug) {
        return subjectRepository.findBySlug(slug)
                .orElseThrow(() -> new RuntimeException("Error: Subject is not found."));
    }

    public Subject createSubject(SubjectCreateDTO subjectCreateDTO) {
        if (subjectRepository.existsBySlug(subjectCreateDTO.getSlug())) {
            throw new AppsException("Subject with name already exists", HttpStatus.CONFLICT.value());
        }

        if (subjectRepository.existsByCode(subjectCreateDTO.getCode())) {
            throw new AppsException("Subject with code already exists", HttpStatus.CONFLICT.value());
        }

        // Create and save the new subject
        Subject subject = new Subject();
        subject.setName(subjectCreateDTO.getName());
        subject.setSlug(subjectCreateDTO.getSlug());
        subject.setCode(subjectCreateDTO.getCode());

        return subjectRepository.save(subject);
    }

    public Subject updateSubject(Integer id, SubjectCreateDTO updateDto) {
        Subject subject = subjectRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Subject not found with ID: " + id));

        subject.setName(updateDto.getName());
        subject.setCode(updateDto.getCode());
        subject.setSlug(updateDto.getSlug());

        return subjectRepository.save(subject);
    }

    public void enableSubject(int subjectId) {
        Subject subject = subjectRepository.findById(subjectId)
                .orElseThrow(() -> new ResourceNotFoundException("Subject not found with ID: " + subjectId));

        subject.setActive(true);
        subjectRepository.save(subject);
    }

    public void disableSubject(int subjectId) {
        Subject subject = subjectRepository.findById(subjectId)
                .orElseThrow(() -> new ResourceNotFoundException("Subject not found with ID: " + subjectId));

        subject.setActive(false);
        subjectRepository.save(subject);
    }

    public void deleteSubject(int subjectId) {
        Subject subject = subjectRepository.findById(subjectId)
                .orElseThrow(() -> new ResourceNotFoundException("Subject not found with ID: " + subjectId));

        boolean isSubjectUsedInCourses = courseRepository.existsBySubject(subject);

        if (isSubjectUsedInCourses) {
            throw new SubjectInUseException("Subject is linked to existing courses and cannot be deleted.");
        }

        subjectRepository.delete(subject);
    }
}
