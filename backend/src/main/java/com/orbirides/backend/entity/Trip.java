package com.orbirides.backend.entity;


import jakarta.persistence.*;
import lombok.*;
import org.hibernate.annotations.CreationTimestamp;

import com.orbirides.backend.enums.TripStatus;

import java.math.BigDecimal;
import java.time.LocalDateTime;

@Entity
@Table(name = "trips")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Trip {

	@Id
    @GeneratedValue(strategy = GenerationType.IDENTITY) // Auto-incremented Primary Key
    private int tripId;

    @Column(nullable = false)
    private Long driverId;

    @Column(nullable = false)
    private String startLocation;

    @Column(nullable = false)
    private String endLocation;

    @Column(nullable = false)
    private LocalDateTime departureTime; // Stores date and time

    @Column(nullable = false, precision = 10, scale = 2)
    private BigDecimal pricePerSeat; // Stores price with 2 decimal places

    @Column(nullable = false)
    private Integer totalSeats;

    @Column(nullable = false)
    private Integer availableSeats; // To track seat availability dynamically

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private TripStatus tripStatus = TripStatus.SCHEDULED; // Default status

    @Column(updatable = false)
    private LocalDateTime createdAt = LocalDateTime.now(); // Stores trip creation timestamp
}

