package com.example.sms.service;

import com.example.sms.dto.Guardian.GuardianCreateDTO;
import com.example.sms.dto.Guardian.GuardianListDTO;
import com.example.sms.dto.Subject.SubjectListDTO;
import com.example.sms.entity.Exam;
import com.example.sms.entity.Guardian;
import com.example.sms.entity.Subject;
import com.example.sms.exception.BadRequestException;
import com.example.sms.exception.GuardianInUseException;
import com.example.sms.exception.ResourceNotFoundException;
import com.example.sms.repository.GuardianRepository;
import com.example.sms.repository.StudentRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import static com.example.sms.utils.SearchUtil.extractSearchValue;

@Service
public class GuardianService {

    @Autowired
    private GuardianRepository guardianRepository;

    @Autowired
    private UserService userService;

    @Autowired
    private StudentRepository studentRepository;

    public Page<GuardianListDTO> getGuardiansPaginated(
            Pageable pageable,
            String search,
            Boolean is_active
    )
    {
        String name = extractSearchValue(search, "name");
        Page<Guardian> guardianPage = guardianRepository.searchGuardian(name, is_active, pageable);

        return guardianPage.map(GuardianListDTO::new);
    }

    public Guardian getGuardianById(Integer id) {
        return guardianRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Guardian not found with slug: " + id));
    }

    public Guardian getGuardianByIdentityNumber(String identityNumber) {
        return guardianRepository.findByNationalIdentityNumber(identityNumber)
                .orElseThrow(() -> new ResourceNotFoundException("Guardian not found with slug: " + identityNumber));
    }

    public Guardian createGuardian(GuardianCreateDTO createDto) {
        if (guardianRepository.existsByNationalIdentityNumber(createDto.getNationalIdentityNumber())) {
            throw new BadRequestException("Guardian with NIC number '" + createDto.getNationalIdentityNumber() + "' already exists.");
        }

        Guardian guardian = new Guardian();
        guardian.setFirstName(createDto.getFirstName());
        guardian.setLastName(createDto.getLastName());
        guardian.setEmail(createDto.getEmail());
        guardian.setNationalIdentityNumber(createDto.getNationalIdentityNumber());
        guardian.setContactNumber(createDto.getContactNumber());
        guardian.setRelationship(createDto.getRelationship());

        return guardianRepository.save(guardian);
    }

    public Guardian updateGuardian(Integer id, GuardianCreateDTO updateDto) {
        Guardian guardian = guardianRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Guardian not found with ID: " + id));

        guardian.setFirstName(updateDto.getFirstName());
        guardian.setLastName(updateDto.getLastName());
        guardian.setEmail(updateDto.getEmail());
        guardian.setNationalIdentityNumber(updateDto.getNationalIdentityNumber());
        guardian.setContactNumber(updateDto.getContactNumber());
        guardian.setRelationship(updateDto.getRelationship());

        return guardianRepository.save(guardian);
    }

    public void enableGuardian(int guardianId) {
        Guardian guardian = guardianRepository.findById(guardianId)
                .orElseThrow(() -> new ResourceNotFoundException("Guardian not found with ID: " + guardianId));

        guardian.setActive(true);
        guardianRepository.save(guardian);
    }

    public void disableGuardian(int guardianId) {
        Guardian guardian = guardianRepository.findById(guardianId)
                .orElseThrow(() -> new ResourceNotFoundException("Guardian not found with ID: " + guardianId));

        guardian.setActive(false);
        guardianRepository.save(guardian);
    }

    public void deleteGuardian(Integer guardianId) {
        Guardian guardian = guardianRepository.findById(guardianId)
                .orElseThrow(() -> new ResourceNotFoundException("Guardian not found with ID: " + guardianId));

        boolean isGuardianUsedInStudents = studentRepository.existsByGuardian(guardian);

        if (isGuardianUsedInStudents) {
            throw new GuardianInUseException("Guardian is linked to existing student and cannot be deleted.");
        }

        guardianRepository.deleteById(guardianId);
    }
}
