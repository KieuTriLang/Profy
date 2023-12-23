package com.ktl.profyBe.user;

import java.util.UUID;

import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class UserService {

    private final UserRepo userRepo;
    private final PasswordEncoder passwordEncoder;

    public User signUp(String username, String password) {
        return userRepo.save(
                User.builder()
                        .id(UUID.randomUUID().toString())
                        .username(username)
                        .password(passwordEncoder.encode(password))
                        .build());
    }

}
