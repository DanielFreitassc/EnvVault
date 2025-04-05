package com.danielfreitassc.backend.services;

import java.io.IOException;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import com.danielfreitassc.backend.dtos.EnvCreateDto;
import com.danielfreitassc.backend.dtos.EnvRequestDto;
import com.danielfreitassc.backend.dtos.EnvResponseDto;
import com.danielfreitassc.backend.dtos.MessageResponseDto;
import com.danielfreitassc.backend.utils.ForbiddenWordsFilterWindows;


@Service
public class EnvServiceWindows {
    private Map<String, String> envCache = new HashMap<>(System.getenv());

    public List<EnvResponseDto> getEnvs(String search) {
        return envCache.keySet().stream()
            .filter(key -> !ForbiddenWordsFilterWindows.containsForbiddenWords(key))
            .filter(key -> {
                if (search == null || search.isEmpty()) return true;
                return key.toLowerCase().contains(search.toLowerCase());
            })
            .sorted(String::compareToIgnoreCase)
            .map(EnvResponseDto::new)
            .collect(Collectors.toList());
    }

    public EnvCreateDto addEnv(EnvRequestDto envRequestDto) {
        if (envCache.containsKey(envRequestDto.name())) {
            throw new ResponseStatusException(HttpStatus.CONFLICT, "Erro: A variável de ambiente " + envRequestDto.name() + " já existe.");
        }

        if (ForbiddenWordsFilterWindows.containsForbiddenWords(envRequestDto.name())) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST,"Erro: O nome da variável '" + envRequestDto.name() + "' é proibido, pois é utilizado pelo sistema operacional.");
        }
    
        try {
            ProcessBuilder processBuilder = new ProcessBuilder("setx", envRequestDto.name(), envRequestDto.value());
            Process process = processBuilder.start();
            process.waitFor();
    
            envCache.put(envRequestDto.name(), envRequestDto.value());
        } catch (IOException | InterruptedException e) {
            e.printStackTrace();
            return new EnvCreateDto(envRequestDto.name(), "Erro ao adicionar a variável de ambiente: " + e.getMessage());
        }
    
        return new EnvCreateDto(envRequestDto.name(), "Variável de ambiente: " + envRequestDto.name() + " adicionada.");
    }

    public MessageResponseDto updateEnv(EnvRequestDto envRequestDto) {
        if (ForbiddenWordsFilterWindows.containsForbiddenWords(envRequestDto.name())) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST,"Erro: O nome da variável '" + envRequestDto.name() + "' é proibido, pois é utilizado pelo sistema operacional.");
        }

        try {
            ProcessBuilder processBuilder = new ProcessBuilder("setx", envRequestDto.name(), envRequestDto.value());
            Process process = processBuilder.start();
            process.waitFor();

            envCache.put(envRequestDto.name(), envRequestDto.value());
        } catch (IOException | InterruptedException e) {
            e.printStackTrace();
            return new MessageResponseDto("Erro ao adicionar a variável de ambiente: " + e.getMessage());
        }

        return new MessageResponseDto("Variável atualizada com sucesso");
    }

    public MessageResponseDto deleteEnv(String name) {
        if (ForbiddenWordsFilterWindows.containsForbiddenWords(name)) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST,"Erro: O nome da variável '" + name + "' é proibido, pois é utilizado pelo sistema operacional.");
        }

        try {
            ProcessBuilder processBuilder = new ProcessBuilder("cmd", "/c", "reg", "delete", "HKEY_CURRENT_USER\\Environment", "/F", "/v", name);
            Process process = processBuilder.start();
            process.waitFor();
    
            envCache.remove(name);
        } catch (IOException | InterruptedException e) {
            e.printStackTrace();
        }

        return new MessageResponseDto("Variável de ambiente: " + name + " Removida");
    }
}
