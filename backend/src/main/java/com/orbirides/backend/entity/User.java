package com.orbirides.backend.entity;

import com.orbirides.backend.enums.Role;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Table(name = "users")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class User {
    
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long userId;
    
    @Column(nullable = false, length = 50,unique = true)
    private String userName;
    
    @Column(nullable = false, length = 50)
    private String name;
    
    @Column(nullable = false, unique = true, length = 100)
    private String email;
    
    @Column(nullable = false, unique = true, length = 15)
    private String phoneNumber;
    
    @Column(nullable = false)
    private String passwordHash;
    
    @Column
    private String profilePicture;
     
    @Column
    private String driverLicense;
    
    @Column
    private double rating = 0.0;
    
    @Column
    private int totalRides = 0;

    @Column
    @Enumerated(EnumType.STRING)
    private Role role = Role.PASSENGER;
}
    