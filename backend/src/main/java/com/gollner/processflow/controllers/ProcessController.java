package com.gollner.processflow.controllers;

import com.gollner.processflow.dto.processes.request.ProcessRequestDTO;
import com.gollner.processflow.dto.processes.response.ProcessMinDTO;
import com.gollner.processflow.services.ProcessService;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

import java.net.URI;

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

    @PostMapping
    public ResponseEntity<ProcessMinDTO> insert(@RequestBody ProcessRequestDTO processRequestDTO) {
        ProcessMinDTO process = service.insert(processRequestDTO);

        URI uri = ServletUriComponentsBuilder
                .fromCurrentRequest()
                .path("/{id}")
                .buildAndExpand(process.id())
                .toUri();

        return ResponseEntity.created(uri).body(process);
    }
}
