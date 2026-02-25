package com.gollner.processflow.repositories;

import com.gollner.processflow.entities.Process;
import com.gollner.processflow.entities.Task;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.UUID;

public interface TaskRepository extends JpaRepository<Task, UUID> {

    List<Task> findAllByProcess(Process process);
}
