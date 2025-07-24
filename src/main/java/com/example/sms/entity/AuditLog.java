package com.example.sms.entity;

import jakarta.persistence.*;
import lombok.Data;

import java.time.LocalDateTime;

@Data
@Entity
public class AuditLog {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String entityName;
    private String operation; // CREATE, UPDATE, DELETE
    private String username;  // Who performed the operation
    private LocalDateTime timestamp;

    @Lob
    private String oldValue;

    @Lob
    private String newValue;
}
