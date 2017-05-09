package com.seek.api.controllers;

import com.seek.api.security.JwtTokenHandler;
import com.seek.api.service.UserService;
import com.seek.api.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/users")
public class UserController {

    private final UserRepository userRepository;
    private final UserService userService;
    private final JwtTokenHandler jwtTokenHandler;

    @Autowired
    public UserController(UserRepository userRepository, UserService userService, JwtTokenHandler jwtTokenHandler) {
        this.userRepository = userRepository;
        this.userService = userService;
        this.jwtTokenHandler = jwtTokenHandler;
    }



}
