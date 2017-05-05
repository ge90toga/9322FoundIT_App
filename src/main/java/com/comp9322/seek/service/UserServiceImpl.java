package com.comp9322.seek.service;


import com.comp9322.seek.model.User;
import com.comp9322.seek.dto.UserDTO;
import com.comp9322.seek.model.Role;
import com.comp9322.seek.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.AccountStatusUserDetailsChecker;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

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
    public User createUser(UserDTO userDTO) {
        User user = toUserRole(userDTO);
        return userRepository.save(user);
    }

    private User toUserRole(UserDTO userDTO) {
        User user = userDTO.toUser();
        Role role = new Role();
        role.setRolename("ROLE_USER");
        user.setRole(role);
        return user;
    }

    @Override
    public User createAdmin(UserDTO userDTO) {
        User user = userDTO.toUser();
        Role role = new Role();
        role.setRolename("ROLE_ADMIN");
        user.setRole(role);
        return userRepository.save(user);
    }

}
