package com.seek.api.repository;

import com.seek.api.model.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;


public interface UserRepository extends JpaRepository<User, Long> {
    Optional<User> findByUsername(String username);
//    List<User> findByRole(String role);
}
