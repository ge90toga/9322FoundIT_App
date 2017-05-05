package com.seek.api.controllers;

import com.seek.api.model.User;
import com.seek.api.repository.UserRepository;
import com.seek.api.security.JwtTokenHandler;
import com.seek.api.service.UserService;
import io.swagger.annotations.ApiOperation;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

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

    @ApiOperation(value = "List of admins", response = ResponseEntity.class)
    @RequestMapping(value = "/admin-list", method = RequestMethod.GET)
    public ResponseEntity<?> getAllAdmins() {
        List<User> adminList =  userService.findAllAdmin();
        return new ResponseEntity<>(adminList, HttpStatus.OK);   // TODO bug in db jpa query role.
    }


}
