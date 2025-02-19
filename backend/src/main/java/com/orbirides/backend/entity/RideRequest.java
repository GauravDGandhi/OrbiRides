package com.orbirides.backend.entity;

import jakarta.persistence.*;
import lombok.*;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;

import com.orbirides.backend.enums.RideStatus;

import java.time.LocalDateTime;

@Entity
@Table(name = "ride_requests")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class RideRequest {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long requestId;

    @ManyToOne
    @JoinColumn(name = "trip_id", nullable = false)
    private Trip trip;

    @ManyToOne
    @JoinColumn(name = "stop_id") // Optional, if using multiple stop points
    private TripStop stop;

    @ManyToOne
    @JoinColumn(name = "rider_id", nullable = false)
    private User rider;

    @Column(name = "seats_requested", nullable = false)
    private int seatsRequested;

    @Enumerated(EnumType.STRING)
    @Column(name = "status", nullable = false)
    private RideStatus status = RideStatus.PENDING;

    @CreationTimestamp
    @Column(name = "request_time", updatable = false)
    private LocalDateTime requestTime;

    @UpdateTimestamp
    @Column(name = "updated_at")
    private LocalDateTime updatedAt;
}


