package com.gollner.processflow.controllers;

import com.gollner.processflow.dto.ClientMinDTO;
import com.gollner.processflow.services.ClientService;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping(value = "/clients")
public class ClientController {

    private final ClientService service;

    public ClientController(ClientService service) {
        this.service = service;
    }

    @GetMapping
    public ResponseEntity<Page<ClientMinDTO>> findAll(Pageable pageable) {
        Page<ClientMinDTO> clientsPaged = service.findAll(pageable);
        return ResponseEntity.ok(clientsPaged);
    }
}
