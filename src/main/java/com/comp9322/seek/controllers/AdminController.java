package com.comp9322.seek.controllers;

import com.comp9322.seek.repository.UserRepository;
import com.comp9322.seek.security.JwtTokenHandler;
import com.comp9322.seek.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/admin")
public class AdminController {

    private final UserRepository userRepository;
    private final UserService userService;
    private final JwtTokenHandler jwtTokenHandler;

    @Autowired
    public AdminController(UserRepository userRepository, UserService userService, JwtTokenHandler jwtTokenHandler) {
        this.userRepository = userRepository;
        this.userService = userService;
        this.jwtTokenHandler = jwtTokenHandler;
    }

//    @RequestMapping(method = RequestMethod.POST)
//    public ResponseEntity create(@Valid @RequestBody UserDTO params) {
//        userService.createUser(params);
//        HttpHeaders headers = new HttpHeaders();
//        return new ResponseEntity(headers, HttpStatus.OK);
//    }
}
