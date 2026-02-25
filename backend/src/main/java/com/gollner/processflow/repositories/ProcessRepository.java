package com.gollner.processflow.repositories;

import com.gollner.processflow.entities.Process;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.Optional;
import java.util.UUID;

public interface ProcessRepository extends JpaRepository<Process, UUID> {

    @Query("SELECT obj FROM Process obj WHERE UPPER(obj.title) LIKE UPPER(CONCAT('%', :title, '%')) AND obj.responsibleUser.id = :responsibleId")
    Page<Process> findAllByTitle(Pageable pageable, String title, UUID responsibleId);
}
