package com.gollner.processflow.controllers;

import com.gollner.processflow.dto.processes.ProcessMinDTO;
import com.gollner.processflow.services.ProcessService;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping(value = "/processes")
public class ProcessController {

    private final ProcessService service;

    public ProcessController(ProcessService service) {
        this.service = service;
    }

    @GetMapping
    public ResponseEntity<Page<ProcessMinDTO>> findAllByTitle(Pageable pageable, @RequestParam(name = "title", defaultValue = "") String title) {
        Page<ProcessMinDTO> processesPaged = service.findAllByTitle(pageable, title);
        return ResponseEntity.ok(processesPaged);
    }
}
