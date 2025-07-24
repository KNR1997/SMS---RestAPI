package com.example.sms.service;

import com.example.sms.entity.AuditLog;
import com.example.sms.repository.AuditLogRepository;
import com.google.gson.Gson;
import org.aspectj.lang.JoinPoint;
import org.aspectj.lang.annotation.After;
import org.aspectj.lang.annotation.AfterReturning;
import org.aspectj.lang.annotation.Aspect;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Component;

import java.time.LocalDateTime;

@Aspect
@Component
public class AuditAspect {

    @Autowired
    private AuditLogRepository auditLogRepository;

//    @AfterReturning(pointcut = "execution(* com.example.sms.repository.*.save(..))", returning = "result")
//    public void logCreateOrUpdate(JoinPoint joinPoint, Object result) {
//        Object entity = joinPoint.getArgs()[0];
//
//        AuditLog log = new AuditLog();
//        log.setEntityName(entity.getClass().getSimpleName());
//        log.setOperation("CREATE_OR_UPDATE");
//        log.setTimestamp(LocalDateTime.now());
//        log.setNewValue(new Gson().toJson(entity)); // Use Jackson/Gson
//        log.setUsername(SecurityContextHolder.getContext().getAuthentication().getName());
//
//        auditLogRepository.save(log);
//    }

    @After("execution(* com.example.sms.repository.*.delete(..))")
    public void logDelete(JoinPoint joinPoint) {
        Object entity = joinPoint.getArgs()[0];

        AuditLog log = new AuditLog();
        log.setEntityName(entity.getClass().getSimpleName());
        log.setOperation("DELETE");
        log.setTimestamp(LocalDateTime.now());
        log.setOldValue(new Gson().toJson(entity));
        log.setUsername(SecurityContextHolder.getContext().getAuthentication().getName());

        auditLogRepository.save(log);
    }
}
