package com.example.demo.taskmanager.controller;

import com.example.demo.taskmanager.model.TaskList;
import com.example.demo.taskmanager.service.TaskService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/lists")
public class TaskController {

    @Autowired
    private TaskService taskService;

    @GetMapping
    public ResponseEntity<List<TaskList>> getAllLists() {
        return ResponseEntity.ok(taskService.getAllLists());
    }

    @PostMapping
    public ResponseEntity<TaskList> createList(@RequestBody TaskList taskList) {
        if (taskList.getName() == null || taskList.getName().isEmpty()) {
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        }
        TaskList createdList = taskService.saveList(taskList);
        return new ResponseEntity<>(createdList, HttpStatus.CREATED);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteList(@PathVariable Long id) {
        taskService.deleteList(id);
        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }

    @GetMapping("/{id}")
    public ResponseEntity<TaskList> getListById(@PathVariable Long id) {
        return ResponseEntity.ok(taskService.getListById(id));
    }

    @DeleteMapping("/{listId}/tasks/{taskId}")
    public ResponseEntity<Void> deleteTask(@PathVariable Long listId, @PathVariable Long taskId) {
        taskService.deleteTask(listId, taskId);
        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }

    @PutMapping("/{id}")
    public ResponseEntity<TaskList> updateList(@PathVariable Long id, @RequestBody TaskList updatedList) {
        TaskList existingList = taskService.getListById(id);

        if (existingList == null) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }

        // Atualize as informações da lista existente com os dados da lista atualizada
        existingList.setName(updatedList.getName());
        existingList.setItems(updatedList.getItems());

        TaskList savedList = taskService.saveList(existingList);
        return new ResponseEntity<>(savedList, HttpStatus.OK);
    }

}
