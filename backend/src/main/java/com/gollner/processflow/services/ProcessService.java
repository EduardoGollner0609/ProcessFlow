package com.gollner.processflow.services;

import com.gollner.processflow.dto.processes.request.ProcessRequestDTO;
import com.gollner.processflow.dto.processes.response.ProcessMinDTO;
import com.gollner.processflow.entities.Client;
import com.gollner.processflow.entities.Process;
import com.gollner.processflow.entities.User;
import com.gollner.processflow.enums.ProcessStatus;
import com.gollner.processflow.repositories.ProcessRepository;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

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
        Page<Process> processes = repository.findAllByTitle(pageable, title);
        return processes.map(ProcessMinDTO::new);
    }

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

}
