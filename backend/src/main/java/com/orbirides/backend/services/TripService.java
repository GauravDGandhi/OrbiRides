package com.orbirides.backend.services;

import com.orbirides.backend.entity.Trip;
import com.orbirides.backend.enums.TripStatus;
import com.orbirides.backend.exception.ResourceNotFoundException;
import com.orbirides.backend.repository.TripRepository;

import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class TripService {

    private final TripRepository tripRepository;

    public TripService(TripRepository tripRepository) {
        this.tripRepository = tripRepository;
    }

    // Create a new trip
    public Trip createTrip(Trip trip) {
        return tripRepository.save(trip);
    }

    // Get a trip by ID
    public Optional<Trip> getTripById(int tripId) {
        return tripRepository.findById(tripId);
    }

    // Get all trips by a driver
    public List<Trip> getTripsByDriver(Long driverId) {
        return tripRepository.findByDriverId(driverId);
    }

    // Get all trips by status
    public List<Trip> getTripsByStatus(TripStatus status) {
        return tripRepository.findByTripStatus(status);
    }

    // Update trip status
    public Trip updateTripStatus(int tripId, TripStatus newStatus) {
        Optional<Trip> tripOptional = tripRepository.findById(tripId);
        if (tripOptional.isPresent()) {
            Trip trip = tripOptional.get();
            trip.setTripStatus(newStatus);
            return tripRepository.save(trip);
        }
        return null;
    }
    
    public List<Trip> getTripsByStatusAndLocation(String startLocation, String endLocation, TripStatus tripStatus) {
        return tripRepository.findByStartLocationAndEndLocationAndTripStatus(startLocation, endLocation, tripStatus);
    }
    
    // cancel trip
    public boolean cancelTrip(int tripId) throws ResourceNotFoundException {
        Trip trip = tripRepository.findById(tripId)
                .orElseThrow(() -> new ResourceNotFoundException("Trip not found" + tripId));
        
        if (trip.getTripStatus() == TripStatus.CANCELLED) {
            return false; // Already cancelled
        }

        trip.setTripStatus(TripStatus.CANCELLED);
        tripRepository.save(trip);
        return true;
    }


    
    
    // update trip
    
    public Trip updateTrip(int tripId, Trip updatedTrip) throws ResourceNotFoundException {
        Trip trip = tripRepository.findById(tripId)
                .orElseThrow(() -> new ResourceNotFoundException("Trip not found"));
        
        trip.setStartLocation(updatedTrip.getStartLocation());
        trip.setEndLocation(updatedTrip.getEndLocation());
        trip.setPricePerSeat(updatedTrip.getPricePerSeat());
        trip.setDepartureTime(updatedTrip.getDepartureTime());
        trip.setTotalSeats(updatedTrip.getTotalSeats());
        trip.setAvailableSeats(updatedTrip.getAvailableSeats());
        
        return tripRepository.save(trip);
    }

    
    

    // Update available seats dynamically
    public Trip updateAvailableSeats(int tripId, int bookedSeats) {
        Optional<Trip> tripOptional = tripRepository.findById(tripId);
        if (tripOptional.isPresent()) {
            Trip trip = tripOptional.get();
            int newAvailableSeats = trip.getAvailableSeats() - bookedSeats;
            if (newAvailableSeats < 0) {
                throw new IllegalArgumentException("Not enough available seats.");
            }
            trip.setAvailableSeats(newAvailableSeats);
            return tripRepository.save(trip);
        }
        return null;
    }
}
