package com.gollner.processflow.dto.users;

import com.gollner.processflow.entities.User;

public record UserMinDTO(String name, String document, String email, String phone) {

    public UserMinDTO(User user) {
        this(user.getName(),
                user.getDocument(),
                user.getEmail(),
                user.getPhone());
    }
}
