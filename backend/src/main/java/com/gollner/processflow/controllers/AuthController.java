package com.gollner.processflow.controllers;

import com.gollner.processflow.dto.auth.request.LoginRequestDTO;
import com.gollner.processflow.dto.auth.request.RegisterRequestDTO;
import com.gollner.processflow.dto.auth.response.AuthResponseDTO;
import com.gollner.processflow.services.UserService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping(value = "/auth")
public class AuthController {

    private final UserService userService;

    public AuthController(UserService userService) {
        this.userService = userService;
    }

    @PostMapping(value = "/login")
    public ResponseEntity<AuthResponseDTO> login(@RequestBody LoginRequestDTO loginRequestDTO) {
        AuthResponseDTO loginResponse = userService.login(loginRequestDTO);
        return ResponseEntity.ok(loginResponse);
    }


    @PostMapping(value = "/register")
    public ResponseEntity<AuthResponseDTO> login(@RequestBody RegisterRequestDTO registerRequestDTO) {
        AuthResponseDTO registerResponse = userService.register(registerRequestDTO);
        return ResponseEntity.ok(registerResponse);
    }
}
