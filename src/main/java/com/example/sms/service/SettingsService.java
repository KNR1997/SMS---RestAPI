package com.example.sms.service;

import com.example.sms.enums.RoleType;
import com.example.sms.entity.Role;
import com.example.sms.repository.RoleRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class SettingsService {

    @Autowired
    private RoleRepository roleRepository;

    public void initRole() {

        if (!roleRepository.existsByName(RoleType.ROLE_ADMIN)) {
            Role adminRole = new Role();
            adminRole.setName(RoleType.ROLE_ADMIN);
            roleRepository.save(adminRole);
        }

        if (!roleRepository.existsByName(RoleType.ROLE_TEACHER)) {
            Role fgRole = new Role();
            fgRole.setName(RoleType.ROLE_TEACHER);
            roleRepository.save(fgRole);
        }

        if (!roleRepository.existsByName(RoleType.ROLE_RECEPTIONIST)) {
            Role fgHeadRole = new Role();
            fgHeadRole.setName(RoleType.ROLE_RECEPTIONIST);
            roleRepository.save(fgHeadRole);
        }

        if (!roleRepository.existsByName(RoleType.ROLE_STUDENT)) {
            Role fgHeadRole = new Role();
            fgHeadRole.setName(RoleType.ROLE_STUDENT);
            roleRepository.save(fgHeadRole);
        }
    }

}
