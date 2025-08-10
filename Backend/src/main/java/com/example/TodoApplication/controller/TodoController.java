/*
 * @ (#) .java    1.0
 * Copyright (c)  IUH. All rights reserved.
 */
package com.example.TodoApplication.controller;

import com.example.TodoApplication.entity.Todo;
import com.example.TodoApplication.service.TodoService;
import lombok.AllArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

/*
 * @description
 * @author: Huu Thai
 * @date:
 * @version: 1.0
 */
@RestController
@AllArgsConstructor
public class TodoController {
    private final TodoService todoService;

    @GetMapping("/todos")
    public ResponseEntity<List<Todo>> getAllTodo(){
        List<Todo> todos = todoService.handleGetAllTodo();
        return ResponseEntity.ok(todos);
    }
    @GetMapping("/todos/{id}")
    public ResponseEntity<Todo> getTodoById(@PathVariable Long id){
        Todo todo = this.todoService.handleGetTodo(id);
        return ResponseEntity.ok(todo);
    }
    @PostMapping("/todos")
    public ResponseEntity<Todo> createTodo(@RequestBody Todo todo){
        Todo newTodo = this.todoService.handleCreateTodo(todo);
        return ResponseEntity.status(HttpStatus.CREATED).body(newTodo);
    }

    @PutMapping("/todos/{id}")
    public ResponseEntity<String> updateTodo(@PathVariable Long id, @RequestBody Todo input){
        this.todoService.handleUpdateTodo(id, input);
        return ResponseEntity.ok().body("update success");
    }
    @DeleteMapping("/todos/{id}")
    public ResponseEntity<String> deleteTodo(@PathVariable Long id){
        this.todoService.handleDeleteTodo(id);
        return ResponseEntity.ok().body("delete success");
    }
}
