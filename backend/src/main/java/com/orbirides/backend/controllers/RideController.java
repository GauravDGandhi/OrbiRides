package com.orbirides.backend.controllers;

import com.orbirides.backend.entity.Ride;
import com.orbirides.backend.services.RideService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/rides")
public class RideController {

    @Autowired
    private RideService rideService;

    @PostMapping("/create")
    public ResponseEntity<Ride> createRide(@RequestBody Ride ride) {
        Ride createdRide = rideService.createRide(ride);
        return ResponseEntity.ok(createdRide);
    }

    @GetMapping("/{rideId}")
    public ResponseEntity<Optional<Ride>> getRideDetails(@PathVariable int rideId) {
        Optional<Ride> ride = rideService.getRideDetails(rideId);
        return ResponseEntity.ok(ride);
    }

    @GetMapping("/trip/{tripId}")
    public ResponseEntity<List<Ride>> getRidesForTrip(@PathVariable int tripId) {
        List<Ride> rides = rideService.getRidesForTrip(tripId);
        return ResponseEntity.ok(rides);
    }

    @GetMapping("/rider/{riderId}")
    public ResponseEntity<List<Ride>> getRidesForRider(@PathVariable Long riderId) {
        List<Ride> rides = rideService.getRidesForRider(riderId);
        return ResponseEntity.ok(rides);
    }

    @PutMapping("/update/{rideId}")
    public ResponseEntity<Ride> updateRideSeats(@PathVariable int rideId, @RequestParam int newSeatsBooked) {
        Ride updatedRide = rideService.updateRideSeats(rideId, newSeatsBooked);
        return ResponseEntity.ok(updatedRide);
    }

    @DeleteMapping("/cancel/{rideId}")
    public ResponseEntity<String> cancelRide(@PathVariable int rideId) {
        rideService.cancelRide(rideId);
        return ResponseEntity.ok("Ride canceled successfully");
    }

    @PutMapping("/assign/{rideId}")
    public ResponseEntity<Ride> assignSeatsToRider(@PathVariable int rideId, @RequestParam int seatsToAssign) {
        Ride updatedRide = rideService.assignSeatsToRider(rideId, seatsToAssign);
        return ResponseEntity.ok(updatedRide);
    }
}

