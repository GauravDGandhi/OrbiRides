package com.orbirides.backend.controllers;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.orbirides.backend.entity.Trip;
import com.orbirides.backend.enums.TripStatus;
import com.orbirides.backend.exception.ResourceNotFoundException;
import com.orbirides.backend.services.TripService;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("api/trips")
public class TripController {

    private final TripService tripService;

    public TripController(TripService tripService) {
        this.tripService = tripService;
    }

    // 1️⃣ Create Trip (POST) - Driver creates a new trip
    @PostMapping
    public ResponseEntity<Trip> createTrip(@RequestBody Trip trip) {
        Trip createdTrip = tripService.createTrip(trip);
        return ResponseEntity.ok(createdTrip);
    }

    // 2️⃣ Get Available Trips (GET) - Passengers fetch trips based on filters
    @GetMapping("/available")
    public ResponseEntity<List<Trip>> getAvailableTrips(
            @RequestParam String startLocation,
            @RequestParam String endLocation) {
        List<Trip> trips = tripService.getTripsByStatusAndLocation(startLocation, endLocation, TripStatus.SCHEDULED);
        return ResponseEntity.ok(trips);
    }

    // 3️⃣ Get Trip by ID (GET) - Fetch details of a specific trip
    @GetMapping("/{tripId}")
    public ResponseEntity<Trip> getTripById(@PathVariable int tripId) {
        Optional<Trip> trip = tripService.getTripById(tripId);
        return trip.map(ResponseEntity::ok).orElseGet(() -> ResponseEntity.notFound().build());
    }

    // 4️⃣ Update Trip (PUT) - Driver updates trip details (price, time, availability)
    @PutMapping("/{tripId}")
    public ResponseEntity<Trip> updateTrip(
            @PathVariable int tripId,
            @RequestBody Trip updatedTrip) throws ResourceNotFoundException {
        Trip trip = tripService.updateTrip(tripId, updatedTrip);
        return trip != null ? ResponseEntity.ok(trip) : ResponseEntity.notFound().build();
    }

    // 5️⃣ Cancel Trip (DELETE) - Driver cancels a scheduled trip
    @DeleteMapping("/{tripId}")
    public ResponseEntity<Void> cancelTrip(@PathVariable int tripId) throws ResourceNotFoundException {
        boolean isCancelled = tripService.cancelTrip(tripId);
        return isCancelled ? ResponseEntity.noContent().build() : ResponseEntity.notFound().build();
    }

    // 6️⃣ Start Trip (PUT) - Driver starts the trip (status changes to ongoing)
    @PutMapping("/{tripId}/start")
    public ResponseEntity<Trip> startTrip(@PathVariable int tripId) {
        Trip trip = tripService.updateTripStatus(tripId, TripStatus.ONGOING);
        return trip != null ? ResponseEntity.ok(trip) : ResponseEntity.notFound().build();
    }

    // 7️⃣ Complete Trip (PUT) - Driver completes the trip (status changes to completed)
    @PutMapping("/{tripId}/complete")
    public ResponseEntity<Trip> completeTrip(@PathVariable int tripId) {
        Trip trip = tripService.updateTripStatus(tripId, TripStatus.COMPLETED);
        return trip != null ? ResponseEntity.ok(trip) : ResponseEntity.notFound().build();
    }
}

