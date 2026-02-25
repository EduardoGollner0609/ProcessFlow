package com.gollner.processflow.services;

import com.gollner.processflow.dto.clients.request.ClientRequestDTO;
import com.gollner.processflow.dto.clients.response.ClientMinDTO;
import com.gollner.processflow.entities.Client;
import com.gollner.processflow.entities.User;
import com.gollner.processflow.repositories.ClientRepository;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.UUID;

@Service
public class ClientService {

    private final ClientRepository repository;
    private AuthService authService;

    public ClientService(ClientRepository repository, AuthService authService) {
        this.repository = repository;
        this.authService = authService;
    }

    @Transactional(readOnly = true)
    public Page<ClientMinDTO> findAllByName(Pageable pageable, String name) {
        User responsibleUser = authService.getAuthenticatedUser();

        Page<Client> clients = repository.findAllByName(pageable, name, responsibleUser.getId());
        return clients.map(ClientMinDTO::new);
    }

    @Transactional
    public ClientMinDTO insert(ClientRequestDTO clientRequestDTO) {
        User responsibleUser = authService.getAuthenticatedUser();

        Client client = new Client();
        copyDtoToEntity(client, clientRequestDTO);
        client.setResponsibleUser(responsibleUser);

        return new ClientMinDTO(repository.save(client));
    }

    public void update(UUID id, ClientRequestDTO clientRequestDTO) {
        Client client = repository.findById(id).orElseThrow(() -> new RuntimeException("Cliente não encontrado"));

        authService.verifyResponsible(client);

        copyDtoToEntity(client, clientRequestDTO);

        repository.save(client);
    }

    @Transactional
    public void delete(UUID id) {
        Client client = repository.findById(id).orElseThrow(() -> new RuntimeException("Cliente não encontrado"));

        authService.verifyResponsible(client);

        repository.deleteById(id);
    }

    private void copyDtoToEntity(Client client, ClientRequestDTO clientRequestDTO) {
        client.setDocument(clientRequestDTO.document());
        client.setEmail(clientRequestDTO.email());
        client.setName(clientRequestDTO.name());
        client.setPhone(clientRequestDTO.phone());
    }
}
