package com.gollner.processflow.controllers;

import com.gollner.processflow.dto.tasks.request.TaskRequestDTO;
import com.gollner.processflow.dto.tasks.response.TaskDTO;
import com.gollner.processflow.repositories.TaskRepository;
import com.gollner.processflow.services.TaskService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

import java.net.URI;
import java.util.List;
import java.util.UUID;

@RestController
@RequestMapping(value = "/tasks")
public class TaskController {

    private final TaskService service;

    public TaskController(TaskService service) {
        this.service = service;
    }

    @GetMapping
    public ResponseEntity<List<TaskDTO>> findAllByResponsibleIdAndProcessId(@RequestParam(name = "processId") UUID processId) {
        List<TaskDTO> tasks = service.findAllByProcess(processId);
        return ResponseEntity.ok(tasks);
    }

    @PostMapping
    public ResponseEntity<TaskDTO> insert(@RequestBody TaskRequestDTO taskRequestDTO) {
        TaskDTO task = service.insert(taskRequestDTO);
        URI uri = ServletUriComponentsBuilder.fromCurrentRequest().path("/{id}").buildAndExpand(task.id()).toUri();
        return ResponseEntity.created(uri).body(task);
    }

    @PutMapping(value = "/{id}")
    public ResponseEntity<Void> update(@PathVariable UUID id, @RequestBody TaskRequestDTO taskRequestDTO) {
        service.update(id, taskRequestDTO);
        return ResponseEntity.noContent().build();
    }


}
