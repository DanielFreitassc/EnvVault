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
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.server.ResponseStatusException;

import com.danielfreitassc.backend.dtos.EnvCreateDto;
import com.danielfreitassc.backend.dtos.EnvRequestDto;
import com.danielfreitassc.backend.dtos.EnvResponseDto;
import com.danielfreitassc.backend.dtos.MessageResponseDto;
import com.danielfreitassc.backend.services.EnvServiceLinux;
import com.danielfreitassc.backend.services.EnvServiceWindows;
import com.danielfreitassc.backend.services.SystemService;

import jakarta.validation.Valid;
import jakarta.websocket.server.PathParam;
import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/env")
@RequiredArgsConstructor
public class EnvController {
    private final EnvServiceWindows envServiceWindows;
    private final SystemService systemService;
    private final EnvServiceLinux envServiceLinux;


    @GetMapping
    public List<EnvResponseDto> getEnvs(@PathParam(value = "search") String search) {
        
        String os = systemService.getOperatingSystem();
        if(os.equals("windows")) {
            return envServiceWindows.getEnvs(search);
        } else if(os.equals("linux")) {
            return envServiceLinux.getEnvs(search);
        }

        throw new ResponseStatusException(HttpStatus.BAD_REQUEST,"Sistema operacional não suportado");
    }


    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    public EnvCreateDto addEnv(@RequestBody @Valid EnvRequestDto envRequestDto) {
        String os = systemService.getOperatingSystem();
        if(os.equals("windows")) {
            return envServiceWindows.addEnv(envRequestDto);
        } else if(os.equals("linux")) {
            return envServiceLinux.addEnv(envRequestDto);
        }

        throw new ResponseStatusException(HttpStatus.BAD_REQUEST,"Sistema operacional não suportado");
    }

    @DeleteMapping("/{name}")
    public MessageResponseDto deleteEnv(@PathVariable String name) {
        String os = systemService.getOperatingSystem();
        if(os.equals("windows")) {
            return envServiceWindows.deleteEnv(name);
        } else if(os.equals("linux")) {
            return envServiceLinux.deleteEnv(name);
        }

        throw new ResponseStatusException(HttpStatus.BAD_REQUEST,"Sistema operacional não suportado");
    }

    @PutMapping
    public MessageResponseDto updateEnv(@RequestBody @Valid EnvRequestDto envRequestDto) {
        String os = systemService.getOperatingSystem();
        if(os.equals("windows")) {
            return envServiceWindows.updateEnv(envRequestDto);
        } else if(os.equals("linux")) {
            return envServiceLinux.updateEnv(envRequestDto);
        }

        throw new ResponseStatusException(HttpStatus.BAD_REQUEST,"Sistema operacional não suportado");
    }
}
