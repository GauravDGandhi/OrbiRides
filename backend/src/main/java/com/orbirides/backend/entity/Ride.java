package com.orbirides.backend.entity;


import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name = "rides")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Ride {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int rideId;

    @ManyToOne
    @JoinColumn(name = "trip_id", nullable = false)
    private Trip trip;

    @ManyToOne
    @JoinColumn(name = "rider_id", nullable = false)
    private User rider;
    @Column(name = "seats_booked", nullable = false)
    private int seatsBooked;

    @ManyToOne
    @JoinColumn(name = "start_stop_id", nullable = false)
    private TripStop startStop;

    @ManyToOne
    @JoinColumn(name = "end_stop_id", nullable = false)
    private TripStop endStop;
}

