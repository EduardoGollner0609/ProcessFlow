package com.gollner.processflow.repositories;

import com.gollner.processflow.entities.Process;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.UUID;

public interface ProcessRepository extends JpaRepository<Process, UUID> {
}
