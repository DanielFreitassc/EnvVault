package com.danielfreitassc.backend.mappers;

import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

import com.danielfreitassc.backend.dtos.UserRequestDto;
import com.danielfreitassc.backend.dtos.UserResponseDTO;
import com.danielfreitassc.backend.models.UserEntity;

@Mapper(componentModel = "spring")
public interface UserMapper {
    UserRequestDto toDto(UserEntity userEntity);

    @Mapping(target = "id", ignore = true)
    @Mapping(target = "createdAt", ignore = true)
    @Mapping(target = "lockoutExpiration", ignore = true)
    @Mapping(target = "loginAttempts", ignore = true)
    @Mapping(target = "authorities", ignore = true)
    UserEntity toEntity(UserRequestDto userRequestDto);

    UserResponseDTO toResponseDto(UserEntity userEntity);
}
