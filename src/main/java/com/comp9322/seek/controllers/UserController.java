package com.comp9322.seek.controllers;

import com.comp9322.seek.security.JwtTokenHandler;
import com.comp9322.seek.service.UserService;
import com.comp9322.seek.dto.UserDTO;
import com.comp9322.seek.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;

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

    @RequestMapping(method = RequestMethod.POST)
    public ResponseEntity create(@Valid @RequestBody UserDTO params) {
        userService.createUser(params);
        HttpHeaders headers = new HttpHeaders();
        return new ResponseEntity(headers, HttpStatus.OK);
    }
}
