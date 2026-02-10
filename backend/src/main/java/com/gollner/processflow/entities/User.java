package com.gollner.processflow.entities;

import jakarta.persistence.*;

import java.util.ArrayList;
import java.util.List;
import java.util.UUID;

@Entity
@Table(name = "tb_user")
public class User {

    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private UUID id;

    @Column(nullable = false, length = 100)
    private String name;

    @Column(nullable = false, unique = true, length = 20)
    private String document;

    @Column(nullable = false, unique = true, length = 120)
    private String email;

    @Column(nullable = false, length = 30)
    private String password;

    @Column(nullable = false, length = 20)
    private String phone;

    @OneToMany(mappedBy = "user")
    private List<Client> clients = new ArrayList<>();

    @OneToMany(mappedBy = "responsibleUser")
    private List<Process> processes = new ArrayList<>();

    public User() {
    }

    public User(UUID id, String name, String document, String email, String phone) {
        this.id = id;
        this.name = name;
        this.document = document;
        this.email = email;
        this.phone = phone;
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

    public void addProcess(Process process) {
        this.processes.add(process);
    }

    public List<Process> getProcesses() {
        return processes;
    }

    public List<Client> getClients() {
        return clients;
    }

    public void addClient(Client client) {
        this.clients.add(client);
    }
}
