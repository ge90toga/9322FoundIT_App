package com.seek.api.service;


import com.seek.api.dto.UserDTO;
import com.seek.api.model.User;
import com.seek.api.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.AccountStatusUserDetailsChecker;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class UserServiceImpl implements UserService  {

    private final UserRepository userRepository;

    @Autowired
    public UserServiceImpl(UserRepository userRepository){
        this.userRepository = userRepository;
    }

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        final Optional<User> user = userRepository.findByUsername(username);
        final AccountStatusUserDetailsChecker detailsChecker = new AccountStatusUserDetailsChecker();
        user.ifPresent(detailsChecker::check);
        return user.orElseThrow(() -> new UsernameNotFoundException("user not found."));
    }

    @Override
    public User update(User user, UserDTO params) {
        params.getEmail().ifPresent(user::setUsername);
        params.getEncodedPassword().ifPresent(user::setPassword);
        params.getName().ifPresent(user::setName);
        return userRepository.save(user);
    }

    @Override
    public Optional<User> findUser(Long id) {
        return Optional.of(userRepository.findOne(id));
    }

    @Override
    public Optional<User> findUserByUsername(String username) {
        return userRepository.findByUsername(username);
    }

    @Override
    public List<User> findAllAdmin() {
        List<User> users = userRepository.findByRole("ROLE_ADMIN");
        return users;
    }

    @Override
    public List<User> findAllReviewer() {
        List<User> users = userRepository.findByRole("ROLE_REVIEWER");
        return users;
    }

    @Override
    public List<User> findAllUser() {
        List<User> users = userRepository.findByRole("ROLE_USER");
        return users;
    }

    @Override
    public User createUser(UserDTO userDTO) {
        User user = toUserRole(userDTO);
        return userRepository.save(user);
    }

    private User toUserRole(UserDTO userDTO) {
        User user = userDTO.toUser();
        if (userDTO == null || userDTO.equals("")) {
            user.setRole("ROLE_USER");
        } else {
            user.setRole(userDTO.getRole());
        }

        return user;
    }

}
