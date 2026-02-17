package com.gollner.processflow.services;

import com.gollner.processflow.dto.ProcessMinDTO;
import com.gollner.processflow.entities.Process;
import com.gollner.processflow.repositories.ProcessRepository;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
public class ProcessService {

    private final ProcessRepository repository;

    public ProcessService(ProcessRepository repository) {
        this.repository = repository;
    }

    @Transactional(readOnly = true)
    public Page<ProcessMinDTO> findAllByTitle(Pageable pageable, String title) {
        Page<Process> processes = repository.findAllByTitle(pageable, title);
        return processes.map(ProcessMinDTO::new);
    }
    
}
