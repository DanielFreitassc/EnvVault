package com.danielfreitassc.backend.repositories;

import java.util.UUID;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.security.core.userdetails.UserDetails;

import com.danielfreitassc.backend.models.UserEntity;

public interface UserRepository extends JpaRepository<UserEntity,UUID> {
    UserDetails findByUsername(String username);
}
