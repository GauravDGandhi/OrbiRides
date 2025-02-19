package com.orbirides.backend.controllers;

import com.orbirides.backend.entity.RideRequest;
import com.orbirides.backend.enums.RideStatus;
import com.orbirides.backend.services.RideRequestService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/ride-requests")
public class RideRequestController {

    @Autowired
    private RideRequestService rideRequestService;

    @PostMapping("/request")
    public ResponseEntity<RideRequest> requestRide(@RequestBody RideRequest rideRequest) {
        RideRequest createdRequest = rideRequestService.requestRide(rideRequest);
        return ResponseEntity.ok(createdRequest);
    }

    @GetMapping("/trip/{tripId}")
    public ResponseEntity<List<RideRequest>> getRideRequestsForTrip(@PathVariable int tripId) {
        List<RideRequest> requests = rideRequestService.getRideRequestsForTrip(tripId);
        return ResponseEntity.ok(requests);
    }

    @GetMapping("/rider/{riderId}")
    public ResponseEntity<List<RideRequest>> getRideRequestsForRider(@PathVariable Long riderId) {
        List<RideRequest> requests = rideRequestService.getRideRequestsForRider(riderId);
        return ResponseEntity.ok(requests);
    }

    @PutMapping("/update/{requestId}")
    public ResponseEntity<RideRequest> updateRideRequestStatus(@PathVariable Long requestId, @RequestParam RideStatus status) {
        RideRequest updatedRequest = rideRequestService.updateRideRequestStatus(requestId, status);
        return ResponseEntity.ok(updatedRequest);
    }

    @DeleteMapping("/cancel/{requestId}")
    public ResponseEntity<String> cancelRideRequest(@PathVariable Long requestId) {
        rideRequestService.cancelRideRequest(requestId);
        return ResponseEntity.ok("Ride request canceled successfully");
    }

    @GetMapping("/status/{requestId}")
    public ResponseEntity<Optional<RideRequest>> getRideRequestStatus(@PathVariable Long requestId) {
        Optional<RideRequest> request = rideRequestService.getRideRequestStatus(requestId);
        return ResponseEntity.ok(request);
    }
}

