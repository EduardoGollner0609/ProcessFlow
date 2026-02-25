package com.gollner.processflow.repositories;

import com.gollner.processflow.entities.Client;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.UUID;

public interface ClientRepository extends JpaRepository<Client, UUID> {

    @Query("SELECT obj FROM Client obj WHERE UPPER(obj.name) LIKE UPPER(CONCAT('%', :name, '%')) AND obj.responsibleUser.id = :responsibleId")
    Page<Client> findAllByName(Pageable pageable, String name, UUID responsibleId);
}
