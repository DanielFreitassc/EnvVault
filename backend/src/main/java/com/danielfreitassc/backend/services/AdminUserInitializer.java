package com.danielfreitassc.backend.services;

import org.springframework.stereotype.Component;
import org.springframework.web.server.ResponseStatusException;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpStatus;

import com.danielfreitassc.backend.dtos.UserRequestDto;
import com.danielfreitassc.backend.models.UserRole;

import jakarta.annotation.PostConstruct;
import lombok.RequiredArgsConstructor;

@Component
@RequiredArgsConstructor
public class AdminUserInitializer {

    private final UserService userService;
    
    @Value("${spring.datasource.username}")
    private String adminUsername;
    
    @Value("${spring.datasource.password}")
    private String adminPassword;

    @PostConstruct
    public void init() {
        try {
            System.out.println(adminUsername);
            System.out.println(adminPassword);
            userService.getByUsername(adminUsername);
        } catch (ResponseStatusException e) {
            if (e.getStatusCode() == HttpStatus.NOT_FOUND) {
                UserRequestDto adminUserDTO = new UserRequestDto("Admin", adminUsername, Boolean.FALSE, adminPassword, UserRole.ADMIN);
                userService.create(adminUserDTO);
            }
        }
    }
}
