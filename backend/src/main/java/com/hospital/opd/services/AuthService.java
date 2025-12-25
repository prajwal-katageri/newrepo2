package com.hospital.opd.services;

import com.hospital.opd.models.User;

public interface AuthService {
    User register(User user);
    String login(String username, String password);
}
