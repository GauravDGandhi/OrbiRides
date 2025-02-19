package com.orbirides.backend.controllers;


import java.io.File;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.concurrent.ConcurrentHashMap;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

import com.orbirides.backend.entity.AuthResponse;
import com.orbirides.backend.entity.LoginRequest;
import com.orbirides.backend.entity.User;
import com.orbirides.backend.enums.Role;
import com.orbirides.backend.filter.CustomJWTTokenService;
import com.orbirides.backend.repository.UserRepository;

import org.springframework.security.core.Authentication;

@CrossOrigin(origins = "http://localhost:3002")
@RestController
@RequestMapping("/auth")
public class AuthController {

    @Autowired
    private AuthenticationManager authenticationManager;
    @Autowired
    private UserRepository userRepository;

    @Autowired
    private CustomJWTTokenService tokenService;
    @Autowired
    private PasswordEncoder passwordEncoder;
    // Store active tokens per username
    private final ConcurrentHashMap<String, String> activeTokens = new ConcurrentHashMap<>();


    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody LoginRequest loginRequest) {
        UsernamePasswordAuthenticationToken authToken =
                new UsernamePasswordAuthenticationToken(loginRequest.getUsername(), loginRequest.getPassword());

        Authentication authentication = authenticationManager.authenticate(authToken);

        String token = tokenService.generateToken(authentication.getName());
        return ResponseEntity.ok(new AuthResponse(token));
    }
//    @PostMapping("/signup")
//    public ResponseEntity<?> signup(@RequestBody User user) {
//        userService.saveUser(user);
//        return ResponseEntity.ok("user added successfully");
//    }
    @PostMapping("/signup")
    public ResponseEntity<String> registerUser(@RequestBody User user) {
        try {

            user.setPasswordHash(user.getPasswordHash());
            user.setPasswordHash(passwordEncoder.encode(user.getPasswordHash()));
            if(user.getRole()==null){
                user.setRole(Role.PASSENGER);
            }
            User savedUser = userRepository.save(user);


            return ResponseEntity.status(201).body("User registered successfully.");
        } catch (Exception e) {
            return ResponseEntity.status(500).body("An error occurred while registering the user.");
        }
    }
    // @PostMapping("/login")
    // public ResponseEntity<?> login(@RequestBody LoginRequest loginRequest) {
    //     String username = loginRequest.getUsername();

    //     // Check if there is an active token for this username
    //     if (activeTokens.containsKey(username)) {
    //         String existingToken = activeTokens.get(username);
    //         // Validate existing token
    //         if (tokenService.validateToken(existingToken)) {
    //             return ResponseEntity.badRequest().body("Only one active session is allowed for this user.");
    //         }
    //     }

    //     // Authenticate user credentials
    //     UsernamePasswordAuthenticationToken authToken =
    //             new UsernamePasswordAuthenticationToken(username, loginRequest.getPassword());
    //     Authentication authentication = authenticationManager.authenticate(authToken);

    //     // Generate new token and store it
    //     String newToken = tokenService.generateToken(username);
    //     activeTokens.put(username, newToken);

    //     return ResponseEntity.ok(new AuthResponse(newToken));
    // }

    // Optional: Method to clear token on logout
    @PostMapping("/logout")
    public ResponseEntity<?> logout(@RequestBody LoginRequest loginRequest) {
        activeTokens.remove(loginRequest.getUsername());
        return ResponseEntity.ok("Logged out successfully.");
    }
}


