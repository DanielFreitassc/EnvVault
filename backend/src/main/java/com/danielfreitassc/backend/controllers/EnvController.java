package com.danielfreitassc.backend.controllers;

import java.util.List;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;

import com.danielfreitassc.backend.dtos.EnvRequestDto;
import com.danielfreitassc.backend.dtos.EnvResponseDto;
import com.danielfreitassc.backend.dtos.MessageResponseDto;
import com.danielfreitassc.backend.services.EnvService;

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
    @ResponseStatus(HttpStatus.CREATED)
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
