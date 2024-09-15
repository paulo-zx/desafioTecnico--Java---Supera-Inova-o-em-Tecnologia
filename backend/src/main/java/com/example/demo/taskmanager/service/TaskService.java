package com.example.demo.taskmanager.service;

import com.example.demo.taskmanager.model.Task;
import com.example.demo.taskmanager.model.TaskList;
import com.example.demo.taskmanager.repository.TaskRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class TaskService {

    @Autowired
    private TaskRepository taskRepository;

    public List<TaskList> getAllLists() {
        return taskRepository.findAll();
    }

    public TaskList saveList(TaskList taskList) {
        // Para cada tarefa, associa a lista antes de salvar
        for (Task task : taskList.getItems()) {
            task.setTaskList(taskList); // Associa a lista à tarefa
        }
        return taskRepository.save(taskList);
    }


    public void deleteList(Long id) {
        taskRepository.deleteById(id);
    }

    public TaskList getListById(Long id) {
        return taskRepository.findById(id).orElseThrow(() -> new RuntimeException("List not found"));
    }

    public void deleteTask(Long listId, Long taskId) {
        TaskList list = getListById(listId);
        list.getItems().removeIf(task -> task.getId().equals(taskId)); // Remove a tarefa pelo id
        taskRepository.save(list);
    }
}
