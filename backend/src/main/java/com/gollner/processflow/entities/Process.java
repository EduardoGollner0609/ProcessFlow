package com.gollner.processflow.entities;

import com.gollner.processflow.enums.ProcessStatus;
import jakarta.persistence.*;

import java.time.Instant;
import java.util.ArrayList;
import java.util.List;
import java.util.UUID;

@Entity
@Table(name = "tb_process")
public class Process {

    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private UUID id;

    @Column(nullable = false, length = 120)
    private String title;

    @Column(nullable = false, columnDefinition = "TEXT")
    private String description;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false, length = 30)
    private ProcessStatus status;

    @Column(columnDefinition = "TIMESTAMP WITHOUT TIME ZONE")
    private Instant createMoment;

    @Column(columnDefinition = "TIMESTAMP WITHOUT TIME ZONE")
    private Instant dueDate;

    @ManyToOne
    @JoinColumn(name = "user_id")
    private User responsibleUser;

    @ManyToOne(optional = false)
    @JoinColumn(name = "client_id")
    private Client client;

    @OneToMany(mappedBy = "process")
    private List<Task> tasks = new ArrayList<>();

    @OneToMany(mappedBy = "process")
    private List<Comment> comments = new ArrayList<>();

    @ElementCollection
    @CollectionTable(
            name = "tb_process_file_url",
            joinColumns = @JoinColumn(name = "process_id")
    )
    @Column(name = "file_url")
    private List<String> filesUrl = new ArrayList<>();

    public Process() {
    }

    public Process(UUID id, String title, String description, ProcessStatus status, Instant createMoment, Instant dueDate, User responsibleUser, Client client) {
        this.id = id;
        this.title = title;
        this.description = description;
        this.status = status;
        this.createMoment = createMoment;
        this.dueDate = dueDate;
        this.responsibleUser = responsibleUser;
        this.client = client;
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

    public ProcessStatus getStatus() {
        return status;
    }

    public void setStatus(ProcessStatus status) {
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

    public User getResponsibleUser() {
        return responsibleUser;
    }

    public void setResponsibleUser(User responsibleUser) {
        this.responsibleUser = responsibleUser;
    }

    public Client getClient() {
        return client;
    }

    public void setClient(Client client) {
        this.client = client;
    }

    public List<Task> getTasks() {
        return tasks;
    }

    public void addTask(Task task) {
        this.tasks.add(task);
    }

    public List<Comment> getComments() {
        return comments;
    }

    public void addComment(Comment comment) {
        this.comments.add(comment);
    }

    public List<String> getFilesUrl() {
        return filesUrl;
    }

    public void addFileUrl(String fileUrl) {
        this.filesUrl.add(fileUrl);
    }
}
