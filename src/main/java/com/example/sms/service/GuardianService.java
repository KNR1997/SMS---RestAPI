package com.example.sms.service;

import com.example.sms.dto.Guardian.GuardianCreateDTO;
import com.example.sms.dto.Guardian.GuardianListDTO;
import com.example.sms.entity.Guardian;
import com.example.sms.exception.ResourceNotFoundException;
import com.example.sms.repository.GuardianRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

@Service
public class GuardianService {

    @Autowired
    private GuardianRepository guardianRepository;

    @Autowired
    private UserService userService;

    public Page<GuardianListDTO> getGuardiansPaginated(Pageable pageable) {
        Page<Guardian> guardianPage = guardianRepository.findAll(pageable);
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

        Guardian guardian = new Guardian();
        guardian.setFirstName(createDto.getFirstName());
        guardian.setLastName(createDto.getLastName());
        guardian.setEmail(createDto.getEmail());
        guardian.setNationalIdentityNumber(createDto.getNationalIdentityNumber());
        guardian.setContactNumber(createDto.getContactNumber());

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

        return guardianRepository.save(guardian);
    }
}
