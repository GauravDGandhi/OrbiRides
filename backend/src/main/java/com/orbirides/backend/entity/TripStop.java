package com.orbirides.backend.entity;
import jakarta.persistence.*;
import lombok.*;

import java.math.BigDecimal;
import java.time.LocalDateTime;

@Entity
@Table(name = "trip_stops")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class TripStop {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int stopId;

    @ManyToOne
    @JoinColumn(name = "trip_id", nullable = false)
    private Trip trip;

    @Column(name = "stop_order", nullable = false)
    private int stopOrder;

    @Column(name = "stop_location", nullable = false, length = 255)
    private String stopLocation;

    @Column(name = "stop_time")
    private LocalDateTime stopTime; // Nullable field
    
    @Column(name = "distance_in_kms", precision = 10, scale = 2, nullable = false)
    private BigDecimal distanceInKms;

    @Column(name = "available_seats", nullable = false)
    private int availableSeats;
}

