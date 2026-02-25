package com.gollner.processflow.services;

import com.gollner.processflow.dto.tasks.request.TaskRequestDTO;
import com.gollner.processflow.dto.tasks.response.TaskDTO;
import com.gollner.processflow.entities.Process;
import com.gollner.processflow.entities.Task;
import com.gollner.processflow.entities.User;
import com.gollner.processflow.enums.TaskStatus;
import com.gollner.processflow.repositories.ProcessRepository;
import com.gollner.processflow.repositories.TaskRepository;
import org.springframework.stereotype.Service;

import java.time.Instant;
import java.util.List;
import java.util.UUID;

@Service
public class TaskService {

    private final TaskRepository repository;
    private final ProcessRepository processRepository;
    private final AuthService authService;

    public TaskService(TaskRepository repository, ProcessRepository processRepository, AuthService authService) {
        this.repository = repository;
        this.processRepository = processRepository;
        this.authService = authService;
    }

    public List<TaskDTO> findAllByProcess(UUID processId) {
        Process process = processRepository
                .findById(processId)
                .orElseThrow(() -> new RuntimeException("Processo não encontrado"));

        authService.verifyResponsible(process);

        List<Task> tasks = repository.findAllByProcess(process);
        return tasks.stream().map(TaskDTO::new).toList();
    }

    public TaskDTO insert(TaskRequestDTO taskRequestDTO) {
        Process process = new Process();
        process.setId(taskRequestDTO.processId());

        Task task = new Task();
        task.setTitle(taskRequestDTO.title());
        task.setDescription(taskRequestDTO.description());
        task.setCreateMoment(Instant.now());
        task.setDueDate(taskRequestDTO.dueDate());
        task.setStatus(TaskStatus.EM_ANDAMENTO);
        task.setProcess(process);

        return new TaskDTO(repository.save(task));
    }
}
