package com.ktl.profyBe.user;

import java.util.Optional;

import org.springframework.data.mongodb.repository.MongoRepository;
import java.util.List;

public interface UserRepo extends MongoRepository<User, String> {

    Optional<User> findByUsername(String username);

}
