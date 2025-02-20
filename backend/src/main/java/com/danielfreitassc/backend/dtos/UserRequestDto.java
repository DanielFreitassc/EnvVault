package com.danielfreitassc.backend.dtos;

import com.danielfreitassc.backend.configuration.OnCreate;
import com.danielfreitassc.backend.models.UserRole;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;

public record UserRequestDto(
    @NotBlank(groups = OnCreate.class, message = "Nome não pode ser um campo em branco.") 
    String name,

    @NotBlank(groups = OnCreate.class, message = "Username não pode ser um campo em branco") 
    String username,
    
    @NotBlank(groups = OnCreate.class, message = "Senha não pode ser um campo em branco") 
    String password,

    @NotNull(groups = OnCreate.class, message = "Cargo de segurança não pode ser um campo em branco")
     UserRole role
) {
    
}
