package com.gollner.processflow.services;

import com.gollner.processflow.dto.auth.request.LoginRequestDTO;
import com.gollner.processflow.dto.auth.request.RegisterRequestDTO;
import com.gollner.processflow.dto.auth.response.AuthResponseDTO;
import com.gollner.processflow.dto.users.UserMinDTO;
import com.gollner.processflow.entities.User;
import com.gollner.processflow.infra.security.security.TokenService;
import com.gollner.processflow.repositories.UserRepository;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
public class UserService {

    private final UserRepository repository;
    private final PasswordEncoder passwordEncoder;
    private final TokenService tokenService;

    public UserService(UserRepository repository, PasswordEncoder passwordEncoder, TokenService tokenService) {
        this.repository = repository;
        this.passwordEncoder = passwordEncoder;
        this.tokenService = tokenService;
    }

    @Transactional
    public AuthResponseDTO login(LoginRequestDTO loginRequestDTO) {
        User user = repository.findByEmail(loginRequestDTO.email()).orElseThrow(() -> new RuntimeException("Credenciais inválidas"));

        if (!passwordEncoder.matches(loginRequestDTO.password(), user.getPassword())) {
            throw new RuntimeException("Credenciais inválidas");
        }
        String token = tokenService.generateToken(user);

        return new AuthResponseDTO(token);
    }

    @Transactional
    public AuthResponseDTO register(RegisterRequestDTO registerRequestDTO) {
        repository.findByEmail(registerRequestDTO.email())
                .ifPresent(user -> {
                    throw new RuntimeException("Email já existe");
                });

        User user = repository.save(new User(
                registerRequestDTO.name(),
                registerRequestDTO.document(),
                registerRequestDTO.email(),
                passwordEncoder.encode(registerRequestDTO.password()),
                registerRequestDTO.phone()
        ));

        String token = tokenService.generateToken(user);
        return new AuthResponseDTO(token);
    }

    @Transactional(readOnly = true)
    public UserMinDTO getMe() {
        return new UserMinDTO(getAuthenticatedUser());
    }

    private User getAuthenticatedUser() {
        Authentication auth = SecurityContextHolder.getContext().getAuthentication();
        if (auth == null || !(auth.getPrincipal() instanceof User user)) {
            throw new RuntimeException("Usuário não autenticado");
        }
        return user;
    }
}
