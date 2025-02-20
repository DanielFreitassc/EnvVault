package com.danielfreitassc.backend.services;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import com.danielfreitassc.backend.dtos.ValidationResponseDto;

import jakarta.servlet.http.HttpServletRequest;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class ValidationService {
    

    public ResponseEntity<ValidationResponseDto> validate(HttpServletRequest request) {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();

        if(authentication != null && authentication.isAuthenticated()) {
            if(request.isUserInRole("ADMIN")) {
                return ResponseEntity.status(HttpStatus.OK).body(new ValidationResponseDto("Autorizado","ADMIN"));
            } 
        }
        
        throw new ResponseStatusException(HttpStatus.FORBIDDEN,"Não autorizado, você não possui um cargo!");
    }   
}
