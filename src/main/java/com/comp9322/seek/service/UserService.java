package com.comp9322.seek.service;



import com.comp9322.seek.model.User;
import com.comp9322.seek.dto.UserDTO;

import java.util.Optional;

public interface UserService extends org.springframework.security.core.userdetails.UserDetailsService {

    User update(User user, UserDTO params);
    Optional<User> findUser(Long id);
    User createUser(UserDTO userDTO);
    User createAdmin(UserDTO userDTO);

}