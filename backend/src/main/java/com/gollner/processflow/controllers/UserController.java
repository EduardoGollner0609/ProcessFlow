package com.gollner.processflow.controllers;

import com.gollner.processflow.dto.users.UserMinDTO;
import com.gollner.processflow.services.UserService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping(value = "/user")
public class UserController {

    private final UserService userService;

    public UserController(UserService userService) {
        this.userService = userService;
    }


    @GetMapping(value = "/me")
    public ResponseEntity<UserMinDTO> getMe() {
        UserMinDTO user = userService.getMe();
        return ResponseEntity.ok(user);
    }
}
