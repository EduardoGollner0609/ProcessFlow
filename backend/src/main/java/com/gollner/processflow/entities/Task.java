package com.gollner.processflow.entities;

import com.gollner.processflow.enums.TaskStatus;
import jakarta.persistence.*;

import java.time.Instant;
import java.util.UUID;

@Entity
@Table(name = "tb_task")
public class Task {

    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private UUID id;

    @Column(nullable = false, length = 150)
    private String title;

    @Column(columnDefinition = "TEXT")
    private String description;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false, length = 30)
    private TaskStatus status;

    @Column(columnDefinition = "TIMESTAMP WITHOUT TIME ZONE")
    private Instant createMoment;

    @Column(columnDefinition = "TIMESTAMP WITHOUT TIME ZONE")
    private Instant dueDate;

    @ManyToOne(optional = false)
    @JoinColumn(name = "process_id")
    private Process process;

    public Task() {
    }

    public Task(UUID id, String title, String description, TaskStatus status, Instant createMoment, Instant dueDate, Process process) {
        this.id = id;
        this.title = title;
        this.description = description;
        this.status = status;
        this.createMoment = createMoment;
        this.dueDate = dueDate;
        this.process = process;
    }

    public UUID getId() {
        return id;
    }

    public void setId(UUID id) {
        this.id = id;
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public TaskStatus getStatus() {
        return status;
    }

    public void setStatus(TaskStatus status) {
        this.status = status;
    }

    public Instant getCreateMoment() {
        return createMoment;
    }

    public void setCreateMoment(Instant createMoment) {
        this.createMoment = createMoment;
    }

    public Instant getDueDate() {
        return dueDate;
    }

    public void setDueDate(Instant dueDate) {
        this.dueDate = dueDate;
    }

    public Process getProcess() {
        return process;
    }

    public void setProcess(Process process) {
        this.process = process;
    }
}
