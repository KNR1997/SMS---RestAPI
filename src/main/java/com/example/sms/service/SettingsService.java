package com.example.sms.service;

import com.example.sms.entity.ERole;
import com.example.sms.entity.Role;
import com.example.sms.repository.RoleRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class SettingsService {

    @Autowired
    private RoleRepository roleRepository;

    public void initRole() {

        if (!roleRepository.existsByName(ERole.ROLE_ADMIN)) {
            Role adminRole = new Role();
            adminRole.setName(ERole.ROLE_ADMIN);
            roleRepository.save(adminRole);
        }

        if (!roleRepository.existsByName(ERole.ROLE_TEACHER)) {
            Role fgRole = new Role();
            fgRole.setName(ERole.ROLE_TEACHER);
            roleRepository.save(fgRole);
        }

        if (!roleRepository.existsByName(ERole.ROLE_RECEPTIONIST)) {
            Role fgHeadRole = new Role();
            fgHeadRole.setName(ERole.ROLE_RECEPTIONIST);
            roleRepository.save(fgHeadRole);
        }

        if (!roleRepository.existsByName(ERole.ROLE_STUDENT)) {
            Role fgHeadRole = new Role();
            fgHeadRole.setName(ERole.ROLE_STUDENT);
            roleRepository.save(fgHeadRole);
        }
    }

}
