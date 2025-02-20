package com.danielfreitassc.env_vault.controllers;

import java.util.List;

import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.danielfreitassc.env_vault.dtos.EnvRequestDto;
import com.danielfreitassc.env_vault.dtos.EnvResponseDto;
import com.danielfreitassc.env_vault.dtos.MessageResponseDto;
import com.danielfreitassc.env_vault.services.EnvService;

import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/env")
@RequiredArgsConstructor
public class EnvController {
    private final EnvService envService;

    @GetMapping
    public List<EnvResponseDto> getEnvs() {
        return envService.getEnvs();
    }

    @PostMapping
    public MessageResponseDto addEnv(@RequestBody @Valid EnvRequestDto envRequestDto) {
        return envService.addEnv(envRequestDto);
    }

    @DeleteMapping("/{name}")
    public MessageResponseDto deleteEnv(@PathVariable String name) {
        return envService.deleteEnv(name);
    }

    @PutMapping
    public MessageResponseDto updateEnv(@RequestBody @Valid EnvRequestDto envRequestDto) {
        return envService.updateEnv(envRequestDto);
    }
}
