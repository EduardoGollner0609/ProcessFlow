package com.gollner.processflow.entities;

import jakarta.persistence.*;

import java.util.ArrayList;
import java.util.List;
import java.util.UUID;

@Entity
@Table(name = "tb_client")
public class Client {

    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private UUID id;
    @Column(nullable = false, length = 100)
    private String name;
    @Column(nullable = false, length = 20)
    private String document;
    @Column(nullable = false, length = 120)
    private String email;
    @Column(nullable = false, length = 20)
    private String phone;

    @OneToMany(mappedBy = "client")
    private List<Process> processes = new ArrayList<>();

    @ManyToOne(optional = false)
    @JoinColumn(name = "user_id")
    private User user;

    public Client() {
    }

    public Client(UUID id, String name, String document, String email, String phone, User user) {
        this.id = id;
        this.name = name;
        this.document = document;
        this.email = email;
        this.phone = phone;
        this.user = user;
    }

    public UUID getId() {
        return id;
    }

    public void setId(UUID id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getDocument() {
        return document;
    }

    public void setDocument(String document) {
        this.document = document;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getPhone() {
        return phone;
    }

    public void setPhone(String phone) {
        this.phone = phone;
    }

    public List<Process> getProcesses() {
        return processes;
    }

    public void addProcess(Process process) {
        this.processes.add(process);
    }

    public User getUser() {
        return user;
    }

    public void setUser(User user) {
        this.user = user;
    }
}

