package com.example.TodoApplication.controller;/*
 * Author: Hỏi Dân IT - @hoidanit 
 *
 * This source code is developed for the course
 * "Java Spring RESTful APIs - Xây Dựng Backend với Spring Boot".
 * It is intended for educational purposes only.
 * Unauthorized distribution, reproduction, or modification is strictly prohibited.
 *
 * Copyright (c) 2025 Hỏi Dân IT. All Rights Reserved.
 */



import java.util.List;
import java.util.NoSuchElementException;

import com.example.TodoApplication.entity.ApiResponse;
import com.example.TodoApplication.entity.User;
import com.example.TodoApplication.service.UserService;
import jakarta.persistence.EntityNotFoundException;
import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;


@RestController
public class UserController {

	private final UserService userService;

	public UserController(UserService userService) {
		this.userService = userService;
	}

	@PostMapping("/users")
	public ResponseEntity<ApiResponse<User>> createUser(@RequestBody @Valid User user) {
		User created = userService.createUser(user);
		var result = new ApiResponse<>(HttpStatus.CREATED, "createUser", created, null);
		return ResponseEntity.status(HttpStatus.CREATED).body(result);
	}

	@GetMapping("/users")
	public ResponseEntity<ApiResponse<List<User>>> getAllUsers() {
		var result = new ApiResponse<>(HttpStatus.OK, "getAllUsers", userService.getAllUsers(), null);
		return ResponseEntity.ok(result);
	}

	@GetMapping("/users/{id}")
	public ResponseEntity<ApiResponse<User>> getUserById(@PathVariable Long id) {
		return userService.getUserById(id).map(user -> {
			var response = new ApiResponse<>(HttpStatus.OK, "getUserById", user, null);
			return ResponseEntity.ok(response);
		}).orElseGet(() -> {
			ApiResponse<User> errorResponse = new ApiResponse<>(HttpStatus.NOT_FOUND,
					"Không tìm thấy user với ID: " + id, null, "USER_NOT_FOUND");
			return ResponseEntity.status(HttpStatus.NOT_FOUND).body(errorResponse);
		});
	}

	@PutMapping("/users/{id}")
	public ResponseEntity<ApiResponse<User>> updateUser(@PathVariable Long id, @RequestBody User user) {
		User updated = userService.updateUser(id, user);
		var result = new ApiResponse<>(HttpStatus.CREATED, "updateUser", updated, null);
		return ResponseEntity.ok(result);
	}
	@DeleteMapping("/users/{id}")
	public ResponseEntity<ApiResponse<String>> deleteUser(@PathVariable Long id) {
		userService.deleteUser(id);
		var result = new ApiResponse<>(HttpStatus.OK, "deleteUser", "delete successfully", null);
		return ResponseEntity.ok(result);
	}
}
