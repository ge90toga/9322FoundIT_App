package com.seek.api.dto;


import com.fasterxml.jackson.annotation.JsonProperty;
import com.seek.api.model.User;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;

import javax.validation.constraints.Size;
import java.util.Collection;
import java.util.Collections;
import java.util.Optional;


public final class UserDTO {

    private final String role; // "ROLE_USER" "ROLE_ADMIN"

    private final String email;
    @Size(min = 8, max = 100)
    private final String password;
    private final String name;

    public UserDTO(@JsonProperty("email") String email,
                   @JsonProperty("password") String password,
                   @JsonProperty("name") String name,
                   @JsonProperty("role") String role) {
        this.email = email;
        this.password = password;
        this.name = name;
        this.role = role;
    }

    public Optional<String> getEmail() {
        return Optional.ofNullable(email);
    }

    public Optional<String> getEncodedPassword() {
        return Optional.ofNullable(password).map(p -> new BCryptPasswordEncoder().encode(p));
    }

    public Optional<String> getName() {
        return Optional.ofNullable(name);
    }

    public String getRole() {
        return role;
    }

    public User toUser() {
        User user = new User();
        user.setUsername(email);
        user.setRole("");
        user.setPassword(new BCryptPasswordEncoder().encode(password));
        user.setName(name);
        return user;
    }

    public UsernamePasswordAuthenticationToken toAuthenticationToken() {
        return new UsernamePasswordAuthenticationToken(email, password, getAuthorities());
    }

    public Collection<? extends GrantedAuthority> getAuthorities() {
        return Collections.singleton(() -> role);
    } // TODO login set role

}