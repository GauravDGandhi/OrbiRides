package com.orbirides.backend.controllers;


import com.orbirides.backend.entity.TripStop;
import com.orbirides.backend.services.TripStopService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/trip-stops")
public class TripStopController {

    @Autowired
    private TripStopService tripStopService;

    @PostMapping("/create")
    public ResponseEntity<TripStop> createTripStop(@RequestBody TripStop tripStop) {
        TripStop createdStop = tripStopService.createTripStop(tripStop);
        return ResponseEntity.ok(createdStop);
    }

    @GetMapping("/trip/{tripId}")
    public ResponseEntity<List<TripStop>> getStopsByTrip(@PathVariable int tripId) {
        List<TripStop> stops = tripStopService.getStopsByTrip(tripId);
        return ResponseEntity.ok(stops);
    }

    @GetMapping("/{stopId}")
    public ResponseEntity<Optional<TripStop>> getStopDetails(@PathVariable int stopId) {
        Optional<TripStop> stop = tripStopService.getStopDetails(stopId);
        return ResponseEntity.ok(stop);
    }

    @PutMapping("/update/{stopId}")
    public ResponseEntity<TripStop> updateTripStop(@PathVariable int stopId, @RequestBody TripStop updatedStop) {
        TripStop updatedTripStop = tripStopService.updateTripStop(stopId, updatedStop);
        return ResponseEntity.ok(updatedTripStop);
    }

    @DeleteMapping("/delete/{stopId}")
    public ResponseEntity<String> deleteTripStop(@PathVariable int stopId) {
        tripStopService.deleteTripStop(stopId);
        return ResponseEntity.ok("Trip stop deleted successfully");
    }
}

