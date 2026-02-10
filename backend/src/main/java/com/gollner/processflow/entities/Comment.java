package com.gollner.processflow.entities;

import jakarta.persistence.*;

import java.time.Instant;
import java.util.UUID;

@Entity
@Table(name = "tb_comment")
public class Comment {

    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private UUID id;
    @Column(nullable = false, columnDefinition = "TEXT")
    private String content;

    @ManyToOne
    @JoinColumn(name = "process_id")
    private Process process;

    @Column(columnDefinition = "TIMESTAMP WITHOUT TIME ZONE")
    private Instant createMoment;

    public Comment() {}

    public Comment(UUID id, String content, Process process, Instant createMoment) {
        this.id = id;
        this.content = content;
        this.process = process;
        this.createMoment = createMoment;
    }

    public UUID getId() {
        return id;
    }

    public void setId(UUID id) {
        this.id = id;
    }

    public String getContent() {
        return content;
    }

    public void setContent(String content) {
        this.content = content;
    }

    public Process getProcess() {
        return process;
    }

    public void setProcess(Process process) {
        this.process = process;
    }

    public Instant getCreateMoment() {
        return createMoment;
    }

    public void setCreateMoment(Instant createMoment) {
        this.createMoment = createMoment;
    }
}
