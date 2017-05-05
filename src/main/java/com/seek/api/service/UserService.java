package com.seek.api.service;



import com.seek.api.model.User;
import com.seek.api.dto.UserDTO;

import java.util.List;
import java.util.Optional;

public interface UserService extends org.springframework.security.core.userdetails.UserDetailsService {

    User update(User user, UserDTO params);
    Optional<User> findUser(Long id);
    List<User> findAllAdmin();
    List<User> findAllUser();
    User createUser(UserDTO userDTO);

}