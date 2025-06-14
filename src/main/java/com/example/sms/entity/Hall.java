package com.example.sms.entity;

import jakarta.persistence.*;
import lombok.Data;

@Data
@Entity
public class Hall {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;

    @Column(unique = true)
    private String name;

    private Integer examCapacity;

    private Integer lectureCapacity;

}
