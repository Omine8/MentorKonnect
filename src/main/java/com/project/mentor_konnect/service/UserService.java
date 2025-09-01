package com.project.mentor_konnect.service;

import com.project.mentor_konnect.model.User;
import java.util.Optional;

public interface UserService {
    User signup(User user);
    Optional<User> fetchByEmail(String email);
    Optional<User> fetchById(Long id);
}
