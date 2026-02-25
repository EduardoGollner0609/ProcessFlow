package com.gollner.processflow.services;

import com.gollner.processflow.dto.comments.response.CommentDTO;
import com.gollner.processflow.dto.processes.request.ProcessRequestDTO;
import com.gollner.processflow.dto.processes.response.ProcessDTO;
import com.gollner.processflow.dto.processes.response.ProcessMinDTO;
import com.gollner.processflow.dto.tasks.response.TaskDTO;
import com.gollner.processflow.entities.*;
import com.gollner.processflow.entities.Process;
import com.gollner.processflow.enums.ProcessStatus;
import com.gollner.processflow.repositories.ProcessRepository;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.*;

@Service
public class ProcessService {

    private final ProcessRepository repository;
    private final AuthService authService;

    public ProcessService(ProcessRepository repository, AuthService authService) {
        this.repository = repository;
        this.authService = authService;
    }

    @Transactional(readOnly = true)
    public Page<ProcessMinDTO> findAllByTitle(Pageable pageable, String title) {
        User responsibleUser = authService.getAuthenticatedUser();

        Page<Process> processes = repository.findAllByTitle(pageable, title, responsibleUser.getId());
        return processes.map(ProcessMinDTO::new);
    }

    @Transactional(readOnly = true)
    public ProcessDTO findById(UUID id) {
        Process process = repository.findById(id).orElseThrow(() -> new RuntimeException("Processo não encontrado"));

        authService.verifyResponsible(process);

        List<CommentDTO> comments = new ArrayList<>(process.getComments())
                .stream().map(CommentDTO::new).toList();

        List<TaskDTO> tasks = new ArrayList<>(process.getTasks())
                .stream().map(TaskDTO::new).toList();

        Set<String> filesUrl = new LinkedHashSet<>(process.getFilesUrl());

        return new ProcessDTO(process, comments, tasks, filesUrl);
    }

    @Transactional
    public ProcessMinDTO insert(ProcessRequestDTO processRequestDTO) {
        User responsibleUser = authService.getAuthenticatedUser();

        Client client = new Client();
        client.setId(processRequestDTO.clientId());

        Process process = new Process(processRequestDTO.title(),
                processRequestDTO.description(),
                ProcessStatus.EM_ANDAMENTO,
                processRequestDTO.dueDate(),
                responsibleUser,
                client);

        return new ProcessMinDTO(repository.save(process));
    }

    @Transactional
    public void update(UUID id, ProcessRequestDTO processRequestDTO) {
        Process process = repository.findById(id).orElseThrow(() -> new RuntimeException("Processo não encontrado"));

        authService.verifyResponsible(process);

        process.setTitle(processRequestDTO.title());
        process.setDescription(processRequestDTO.description());
        process.setDueDate(processRequestDTO.dueDate());

        repository.save(process);
    }

    @Transactional
    public void delete(UUID id) {
        Process process = repository.findById(id).orElseThrow(() -> new RuntimeException("Processo não encontrado"));

        authService.verifyResponsible(process);

        repository.deleteById(id);
    }
}
