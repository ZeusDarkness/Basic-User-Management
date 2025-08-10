/*
 * @ (#) .java    1.0
 * Copyright (c)  IUH. All rights reserved.
 */
package com.example.TodoApplication.service;

import com.example.TodoApplication.entity.User;
import com.example.TodoApplication.repository.UserRepository;

import static org.junit.jupiter.api.Assertions.*;

import com.example.TodoApplication.service.impl.UserServiceImpl;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import java.util.ArrayList;
import java.util.List;
import java.util.NoSuchElementException;
import java.util.Optional;

import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.verify;
import static org.mockito.Mockito.when;


/*
 * @description
 * @author: Huu Thai
 * @date:
 * @version: 1.0
 */
@ExtendWith(MockitoExtension.class)
public class UserServiceImplTest {
    @Mock
    private UserRepository userRepository;

    @InjectMocks
    private UserServiceImpl userServiceImpl;

    @Test
    public void createUser_ShouldReturnUser_whenEmailValid(){
//        arrange: chuan bi
        User inputUser = new User(null, "thai", "thai@gmail.com");
        User outputUser = new User(1L, "thai", "thai@gmail.com");

        when(this.userRepository.existsByEmail(inputUser.getEmail())).thenReturn(false);
        when(this.userRepository.save(any())).thenReturn(outputUser);

//        act: hanh dong
        User result = this.userServiceImpl.createUser(inputUser);

//        assert: so sanh
        assertEquals(1L, result.getId());
    }
    @Test
    public void createUser_ShouldThrowException_whenEmailInvalid(){
//        arrange: chuan bi
        User inputUser = new User(null, "thai", "thai@gmail.com");
        User outputUser = new User(1L, "thai", "thai@gmail.com");

        when(this.userRepository.existsByEmail(inputUser.getEmail())).thenReturn(true);

//        act: hanh dong
        Exception ex = assertThrows(IllegalArgumentException.class, () -> {
            this.userServiceImpl.createUser(inputUser);
        });

//        assert: so sanh
        assertEquals("Email already exists", ex.getMessage());
    }
    @Test
    public void getAllUsers_ShouldReturnAllUsers(){
//        arrange: chuan bi
        List<User> outputUsers = new ArrayList<>();
        outputUsers.add(new User(1L, "thai1", "thai1@gmail.com"));
        outputUsers.add(new User(2L, "thai2", "thai2@gmail.com"));
        when(this.userRepository.findAll()).thenReturn(outputUsers);

//        act: hanh dong
        List<User> result = this.userServiceImpl.getAllUsers();

//        assert: so sanh
        assertEquals(2, result.size());
        assertEquals("thai1@gmail.com", result.get(0).getEmail());
    }
    @Test
    public void getUserById_ShouldReturnUser(){
//        arrange: chuan bi
        Long inputid = 1L;
        Optional<User> userOptionalOutput = Optional.of(new User(1L, "thai", "thai@gmail.com"));
        when(this.userRepository.findById(inputid)).thenReturn(userOptionalOutput);

//        act: hanh dong
        Optional<User> result = this.userServiceImpl.getUserById(inputid);

//        assert: so sanh
        assertEquals(true, result.isPresent());
    }
    @Test
    public void deleteUser_shouldReturnVoid_WhenUserExists(){
//        arrange: chuan bi
        Long inputId = 1L;
        when(this.userRepository.existsById(inputId)).thenReturn(true);

//        act: hanh dong
        this.userServiceImpl.deleteUser(inputId);

//        assert: so sanh
        verify(this.userRepository).deleteById(inputId);
    }
    @Test
    public void deleteUser_ShouldReturnException_WhenUserNotExists(){
//        arrange: chuan bi
        Long inputId = 1L;
        when(this.userRepository.existsById(inputId)).thenReturn(false);

//        act: hanh dong
        Exception ex = assertThrows(
                NoSuchElementException.class, () -> {
            this.userServiceImpl.deleteUser(inputId);
        });

//        assert: so sanh
        assertEquals("User not found", ex.getMessage());
    }
    @Test
    public void updateUser_ShouldReturnUser_WhenUserExists(){
//        arrange: chuan bi
        Long inputId = 1L;
        User inputUser = new User(1L, "old name", "old@gmail.com");
        User outputUser = new User(1L, "new name", "new@gmail.com");
        when(this.userRepository.findById(inputId)).thenReturn(Optional.of(inputUser));
        when(this.userRepository.save(any())).thenReturn(outputUser);

//        act: hanh dong
        User result = this.userServiceImpl.updateUser(inputId, inputUser);

//        assert: so sanh
        assertEquals("new name", result.getName());
    }




}
