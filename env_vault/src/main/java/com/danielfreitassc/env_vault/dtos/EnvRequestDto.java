package com.danielfreitassc.env_vault.dtos;

import jakarta.validation.constraints.NotBlank;

public record EnvRequestDto(
    @NotBlank(message = "Nome da variável não pode estar vazio.")
    String name,
    @NotBlank(message = "Valor da variável não pode estar vazio.")
    String value
) {
    
}
