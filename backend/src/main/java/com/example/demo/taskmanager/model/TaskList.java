package com.example.demo.taskmanager.model;

import com.fasterxml.jackson.annotation.JsonManagedReference;
import jakarta.persistence.*;
import java.util.ArrayList;
import java.util.List;

@Entity
public class TaskList {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String name;

    @OneToMany(mappedBy = "taskList", cascade = CascadeType.ALL, orphanRemoval = true)
    @JsonManagedReference
    private List<Task> items = new ArrayList<>();

    // Getters e Setters
    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public String getName() { return name; }
    public void setName(String name) { this.name = name; }

    public List<Task> getItems() { return items; }
    public void setItems(List<Task> items) {
        this.items.clear(); // Limpa os itens existentes
        if (items != null) {
            for (Task task : items) {
                task.setTaskList(this); // Associa a tarefa à lista
                this.items.add(task);  // Adiciona a nova tarefa à lista
            }
        }
    }

}
