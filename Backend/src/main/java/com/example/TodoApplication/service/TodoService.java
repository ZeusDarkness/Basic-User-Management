/*
 * @ (#) .java    1.0
 * Copyright (c)  IUH. All rights reserved.
 */
package com.example.TodoApplication.service;

import com.example.TodoApplication.entity.Todo;
import com.example.TodoApplication.repository.TodoRepository;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

/*
 * @description
 * @author: Huu Thai
 * @date:
 * @version: 1.0
 */
@Service
@AllArgsConstructor
public class TodoService {
    private final TodoRepository todoRepository;


    public Todo handleCreateTodo(Todo todo){
        Todo newTodo = this.todoRepository.save(todo);
        return newTodo;
    }
    public void handleUpdateTodo(Long id, Todo inputTodo){
        Optional<Todo> todoOptional = this.todoRepository.findById(id);
        if(todoOptional.isPresent()){
            Todo currentTodo = todoOptional.get();
            currentTodo.setCompleted(inputTodo.isCompleted());
            currentTodo.setUserName(inputTodo.getUserName());
            this.todoRepository.save(currentTodo);
        }
    }
    public void handleDeleteTodo(Long id){
        Optional<Todo> todo = this.todoRepository.findById(id);
        if(todo.isPresent()){
            Todo currentTodo = todo.get();
            this.todoRepository.deleteById(currentTodo.getId());
        }
    }
    public List<Todo> handleGetAllTodo(){
        return this.todoRepository.findAll();
    }
    public Todo handleGetTodo(Long id){
        return this.todoRepository.findById(id).orElse(null);
    }
}
