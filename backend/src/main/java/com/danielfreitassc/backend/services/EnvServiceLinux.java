package com.danielfreitassc.backend.services;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.StandardOpenOption;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import com.danielfreitassc.backend.dtos.EnvRequestDto;
import com.danielfreitassc.backend.dtos.EnvResponseDto;
import com.danielfreitassc.backend.dtos.MessageResponseDto;
import com.danielfreitassc.backend.utils.ForbiddenWordsFilterLinux;

@Service
public class EnvServiceLinux {
    private static final Path SHELL_CONFIG = Path.of(System.getProperty("user.home"), ".bashrc");
    private Map<String, String> envCache = new HashMap<>(System.getenv());

    public List<EnvResponseDto> getEnvs() {
        return envCache.keySet().stream()
            .filter(key -> !ForbiddenWordsFilterLinux.containsForbiddenWords(key))
            .map(EnvResponseDto::new)
            .collect(Collectors.toList());
    }

    public MessageResponseDto addEnv(EnvRequestDto envRequestDto) {
        if (envCache.containsKey(envRequestDto.name())) {
            throw new ResponseStatusException(HttpStatus.CONFLICT, "Erro: A variável de ambiente " + envRequestDto.name() + " já existe.");
        }

        if (ForbiddenWordsFilterLinux.containsForbiddenWords(envRequestDto.name())) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Erro: O nome da variável '" + envRequestDto.name() + "' é proibido, pois é utilizado pelo sistema operacional.");
        }

        try {
            String exportCommand = "export " + envRequestDto.name() + "=" + "\"" + envRequestDto.value() + "\"\n";
            Files.writeString(SHELL_CONFIG, exportCommand, StandardOpenOption.APPEND, StandardOpenOption.CREATE);

            envCache.put(envRequestDto.name(), envRequestDto.value());
        } catch (IOException e) {
            e.printStackTrace();
            return new MessageResponseDto("Erro ao adicionar a variável de ambiente: " + e.getMessage());
        }

        return new MessageResponseDto("Variável de ambiente: " + envRequestDto.name() + " adicionada.");
    }

    public MessageResponseDto updateEnv(EnvRequestDto envRequestDto) {
        if (ForbiddenWordsFilterLinux.containsForbiddenWords(envRequestDto.name())) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Erro: O nome da variável '" + envRequestDto.name() + "' é proibido, pois é utilizado pelo sistema operacional.");
        }

        deleteEnv(envRequestDto.name());
        return addEnv(envRequestDto);
    }

    public MessageResponseDto deleteEnv(String name) {
        if (ForbiddenWordsFilterLinux.containsForbiddenWords(name)) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Erro: O nome da variável '" + name + "' é proibido, pois é utilizado pelo sistema operacional.");
        }

        try {
            List<String> lines = Files.readAllLines(SHELL_CONFIG);
            List<String> updatedLines = lines.stream()
                .filter(line -> !line.startsWith("export " + name + "="))
                .collect(Collectors.toList());

            Files.write(SHELL_CONFIG, updatedLines, StandardOpenOption.TRUNCATE_EXISTING, StandardOpenOption.WRITE);
            envCache.remove(name);
        } catch (IOException e) {
            e.printStackTrace();
        }

        return new MessageResponseDto("Variável de ambiente: " + name + " removida.");
    }
}