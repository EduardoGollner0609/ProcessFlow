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
        copyDtoToEntity(task, taskRequestDTO);
        task.setStatus(TaskStatus.EM_ANDAMENTO);

        return new TaskDTO(repository.save(task));
    }

    public void update(UUID id, TaskRequestDTO taskRequestDTO) {
        Task task = repository.findById(id).orElseThrow(() -> new RuntimeException("Tarefa não encontrada"));
        copyDtoToEntity(task, taskRequestDTO);
        repository.save(task);
    }

    private void copyDtoToEntity(Task task, TaskRequestDTO taskRequestDTO) {
        Process process = new Process();
        process.setId(taskRequestDTO.processId());
        task.setStatus(taskRequestDTO.status() != null ? TaskStatus.valueOf(taskRequestDTO.status()) : TaskStatus.EM_ANDAMENTO);
        task.setTitle(taskRequestDTO.title());
        task.setDescription(taskRequestDTO.description());
        task.setCreateMoment(Instant.now());
        task.setDueDate(taskRequestDTO.dueDate());

        task.setProcess(process);
    }
}
