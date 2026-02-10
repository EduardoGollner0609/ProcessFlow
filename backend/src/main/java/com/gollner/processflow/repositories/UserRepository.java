package com.gollner.processflow.repositories;

import org.springframework.data.jpa.repository.JpaRepository;

import java.util.UUID;

public interface UserRepository extends JpaRepository<UserRepository, UUID> {
}
