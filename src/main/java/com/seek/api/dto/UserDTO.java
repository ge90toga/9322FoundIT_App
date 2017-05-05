package com.seek.api.dto;


import com.seek.api.model.Role;
import com.seek.api.model.User;
import com.fasterxml.jackson.annotation.JsonProperty;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;

import javax.validation.constraints.Size;
import java.util.Collection;
import java.util.Collections;
import java.util.Optional;


public final class UserDTO {

    private final java.lang.String role; // "ROLE_USER" "ROLE_ADMIN"

    private final java.lang.String email;
    @Size(min = 8, max = 100)
    private final java.lang.String password;
    private final java.lang.String name;

    public UserDTO(@JsonProperty("email") java.lang.String email,
                   @JsonProperty("password") java.lang.String password,
                   @JsonProperty("name") java.lang.String name,
                   @JsonProperty("role") java.lang.String role) {
        this.email = email;
        this.password = password;
        this.name = name;
        this.role = role;
    }

    public Optional<java.lang.String> getEmail() {
        return Optional.ofNullable(email);
    }

    public Optional<java.lang.String> getEncodedPassword() {
        return Optional.ofNullable(password).map(p -> new BCryptPasswordEncoder().encode(p));
    }

    public Optional<java.lang.String> getName() {
        return Optional.ofNullable(name);
    }

    public java.lang.String getRole() {
        return role;
    }

    public User toUser() {
        User user = new User();
        user.setUsername(email);
        user.setRole(new Role());
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