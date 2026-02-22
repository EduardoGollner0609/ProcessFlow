package com.gollner.processflow.controllers;

import com.gollner.processflow.dto.auth.request.LoginRequestDTO;
import com.gollner.processflow.dto.auth.request.RegisterRequestDTO;
import com.gollner.processflow.dto.auth.response.AuthResponseDTO;
import com.gollner.processflow.dto.users.UserMinDTO;
import com.gollner.processflow.services.AuthService;
import jakarta.validation.Valid;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping(value = "/auth")
public class AuthController {

    private final AuthService userService;

    public AuthController(AuthService userService) {
        this.userService = userService;
    }

    @PostMapping(value = "/login")
    public ResponseEntity<AuthResponseDTO> login(@Valid @RequestBody LoginRequestDTO loginRequestDTO) {
        AuthResponseDTO loginResponse = userService.login(loginRequestDTO);
        return ResponseEntity.ok(loginResponse);
    }


    @PostMapping(value = "/register")
    public ResponseEntity<AuthResponseDTO> register(@Valid @RequestBody RegisterRequestDTO registerRequestDTO) {
        AuthResponseDTO registerResponse = userService.register(registerRequestDTO);
        return ResponseEntity.ok(registerResponse);
    }

    @GetMapping(value = "/me")
    public ResponseEntity<UserMinDTO> getMe() {
        UserMinDTO user = userService.getMe();
        return ResponseEntity.ok(user);
    }
}
