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
        Page<Client> clients = repository.findAllByName(pageable, name);
        return clients.map(ClientMinDTO::new);
    }

    @Transactional
    public ClientMinDTO insert(ClientRequestDTO clientRequestDTO) {
        User responsibleUser = authService.getAuthenticatedUser();

        Client client = new Client(clientRequestDTO.name(),
                clientRequestDTO.document(),
                clientRequestDTO.email(),
                clientRequestDTO.phone(),
                responsibleUser
        );

        return new ClientMinDTO(repository.save(client));
    }
}
