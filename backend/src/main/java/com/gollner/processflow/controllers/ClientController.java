package com.gollner.processflow.controllers;

import com.gollner.processflow.dto.clients.request.ClientRequestDTO;
import com.gollner.processflow.dto.clients.response.ClientMinDTO;
import com.gollner.processflow.services.ClientService;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

import java.net.URI;

@RestController
@RequestMapping(value = "/clients")
public class ClientController {

    private final ClientService service;

    public ClientController(ClientService service) {
        this.service = service;
    }

    @GetMapping
    public ResponseEntity<Page<ClientMinDTO>> findAllByName(Pageable pageable, @RequestParam(name = "name", defaultValue = "") String name) {
        Page<ClientMinDTO> clientsPaged = service.findAllByName(pageable, name);
        return ResponseEntity.ok(clientsPaged);
    }

    @PostMapping
    public ResponseEntity<ClientMinDTO> insert(@RequestBody ClientRequestDTO clientRequestDTO) {
        ClientMinDTO client = service.insert(clientRequestDTO);

        URI uri = ServletUriComponentsBuilder
                .fromCurrentRequest()
                .path("/{id}")
                .buildAndExpand(client.id())
                .toUri();

        return ResponseEntity.created(uri).body(client);
    }
}
