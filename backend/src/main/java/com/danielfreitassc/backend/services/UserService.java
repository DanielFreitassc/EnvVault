package com.danielfreitassc.backend.services;

import java.util.Optional;
import java.util.UUID;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import com.danielfreitassc.backend.dtos.EnvRequestDto;
import com.danielfreitassc.backend.dtos.MessageResponseDto;
import com.danielfreitassc.backend.dtos.UserRequestDto;
import com.danielfreitassc.backend.dtos.UserResponseDTO;
import com.danielfreitassc.backend.mappers.UserMapper;
import com.danielfreitassc.backend.models.UserEntity;
import com.danielfreitassc.backend.repositories.UserQueryRepositoy;
import com.danielfreitassc.backend.repositories.UserRepository;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class UserService {
    private final UserRepository userRepository;
    private final UserMapper userMapper;
    private final UserQueryRepositoy userQueryRepositoy;
    private final EnvServiceWindows envServiceWindows;

    public ResponseEntity<MessageResponseDto> create(UserRequestDto userRequestDto) {
        if(userRepository.findByUsername(userRequestDto.username()) != null) throw new ResponseStatusException(HttpStatus.BAD_REQUEST,"Usuário já cadatrado.");
        String encryptedPassword = new BCryptPasswordEncoder().encode(userRequestDto.password());
        UserEntity userEntity = userMapper.toEntity(userRequestDto);
        userEntity.setPassword(encryptedPassword);
        userRepository.save(userEntity);
        return ResponseEntity.status(HttpStatus.CREATED).body(new MessageResponseDto("Usuário criado com sucesso."));
    }

    public UserResponseDTO getUser() {
        return userMapper.toResponseDto(findFirstUserOrThrow());
    }

    public UserResponseDTO getById(UUID id) {
        return userMapper.toResponseDto(checkUserId(id));
    }

    public UserResponseDTO getByUsername(String username) {
        Optional<UserEntity> user = userQueryRepositoy.findByUsername(username);
        if(user.isEmpty()) throw new ResponseStatusException(HttpStatus.NOT_FOUND,"Nenhum usuário com este ID cadastrado.");
        return userMapper.toResponseDto(user.get());
    }

    public ResponseEntity<MessageResponseDto> patchUser(UserRequestDto userRequestDto) {
        UserEntity userEntity = findFirstUserOrThrow();
        
        if (userRequestDto.name() != null && !userRequestDto.name().isBlank()) {
            userEntity.setName(userRequestDto.name());
        }
        if (userRequestDto.username() != null && !userRequestDto.username().isBlank()) {
            userEntity.setUsername(userRequestDto.username());
            envServiceWindows.updateEnv(new EnvRequestDto("ENV_VAULT_USER", userRequestDto.username()));
        }
        if (userRequestDto.role() != null) {
            userEntity.setRole(userRequestDto.role());
        }
        if (userRequestDto.password() != null && !userRequestDto.password().isBlank()) {
            String encryptedPassword = new BCryptPasswordEncoder().encode(userRequestDto.password());
            userEntity.setPassword(encryptedPassword);
        }
        
        userRepository.save(userEntity);
        return ResponseEntity.status(HttpStatus.OK).body(new MessageResponseDto("Usuário atualizado com sucesso."));
    }
    
    private UserEntity checkUserId(UUID id) {
        Optional<UserEntity> user = userQueryRepositoy.findById(id);
        if(user.isEmpty()) throw new ResponseStatusException(HttpStatus.NOT_FOUND,"Nenhum usuário com este ID cadastrado.");
        return user.get();
    }

    private UserEntity findFirstUserOrThrow() {
        Optional<UserEntity> user = userQueryRepositoy.findFirstBy();
        if(user.isEmpty()) throw new ResponseStatusException(HttpStatus.NOT_FOUND,"Usuário não encontrado");
        return user.get();
    }
}
