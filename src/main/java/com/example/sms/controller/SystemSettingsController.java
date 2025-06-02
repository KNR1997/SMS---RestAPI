package com.example.sms.controller;

import com.example.sms.entity.Settings;
import com.example.sms.repository.SettingsRepository;
import com.example.sms.service.SettingsService;
import jakarta.annotation.PostConstruct;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/settings")
public class SystemSettingsController {

    @Autowired
    private SettingsRepository settingsRepository;

    @Autowired
    private SettingsService settingsService;

    @PostConstruct
    public void initRoleAndUser() {
        settingsService.initRole();
    }

    @GetMapping
    public ResponseEntity<Settings> getSettings() {
        Settings settings = settingsRepository.findAll().stream().findFirst()
                .orElseThrow(() -> new RuntimeException("Settings not found"));
        return ResponseEntity.ok(settings);
    }
}
