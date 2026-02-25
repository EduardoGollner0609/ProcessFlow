package com.gollner.processflow.entities.abstractions;

import com.gollner.processflow.entities.User;

public interface OwnedByResponsibleUser {
    User getResponsibleUser();
}
