package com.example.sms.service;

import org.springframework.stereotype.Service;

@Service
public class CalculateService {
    public int sum(int x,int y){
        return x+y;
    }
    public int sub(int x,int y){
        return x-y;
    }
    public int multiply(int x,int y){
        return x*y;
    }
}
