package com.danielfreitassc.backend.infra.security;

import org.springframework.http.HttpStatus;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.web.AuthenticationEntryPoint;
import org.springframework.stereotype.Component;

import com.danielfreitassc.backend.dtos.MessageResponseDto;
import com.fasterxml.jackson.databind.ObjectMapper;

import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import java.io.IOException;

@Component
public class CustomAuthenticationEntryPoint implements AuthenticationEntryPoint {

    @Override
    public void commence(HttpServletRequest request, HttpServletResponse response,AuthenticationException authException) throws IOException {
        response.setStatus(HttpStatus.FORBIDDEN.value());
        response.setContentType("application/json");

        MessageResponseDto errorResponse = new MessageResponseDto("Token inválido ou expirado");
        String jsonResponse = new ObjectMapper().writeValueAsString(errorResponse);

        response.getWriter().write(jsonResponse);
    }
}