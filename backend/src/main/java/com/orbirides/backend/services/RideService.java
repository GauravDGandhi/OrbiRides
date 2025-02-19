package com.orbirides.backend.services;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.orbirides.backend.entity.Ride;
import com.orbirides.backend.entity.Trip;
import com.orbirides.backend.entity.User;
import com.orbirides.backend.repository.RideRepository;
import com.orbirides.backend.repository.TripRepository;
import com.orbirides.backend.repository.UserRepository;


@Service
public class RideService{

	
	@Autowired
    private RideRepository rideRepository;
	@Autowired
    private TripRepository tripRepository;
	@Autowired
    private UserRepository userRepository;
	
	public Ride createRide(Ride recivedRide) {
		Trip trip = tripRepository.findById(recivedRide.getTrip().getTripId())
                .orElseThrow(() -> new RuntimeException("Trip not found"));

        User rider = userRepository.findById(recivedRide.getRider().getUserId())
                .orElseThrow(() -> new RuntimeException("User not found"));

        if (trip.getAvailableSeats() < recivedRide.getSeatsBooked()) {
            throw new RuntimeException("Not enough available seats");
        }

        Ride ride = Ride.builder()
                .trip(trip)
                .rider(rider)
                .seatsBooked(recivedRide.getSeatsBooked())
                .startStop(recivedRide.getStartStop())
                .endStop(recivedRide.getEndStop())
                .build();

        // Update available seats in the trip
        trip.setAvailableSeats(trip.getAvailableSeats() - recivedRide.getSeatsBooked());
        tripRepository.save(trip);

        rideRepository.save(ride);
        
        return ride;
	}

	public Optional<Ride> getRideDetails(int rideId) {
		return rideRepository.findById(rideId);
	}

	public List<Ride> getRidesForTrip(int tripId) {
		
		return rideRepository.findByTripTripId(tripId);
	}

	public List<Ride> getRidesForRider(Long riderId) {
		 List<Ride> byRiderUserId = rideRepository.findByRiderUserId(riderId);
			
		 return byRiderUserId;
	}

	public Ride updateRideSeats(int rideId, int newSeatsBooked) {
		 Ride ride = rideRepository.findById(rideId)
	                .orElseThrow(() -> new RuntimeException("Ride not found"));

	        Trip trip = ride.getTrip();

	        // Validate if the new seats can be booked
	        if (trip.getAvailableSeats() + ride.getSeatsBooked() < newSeatsBooked) {
	            throw new RuntimeException("Not enough available seats");
	        }

	        trip.setAvailableSeats(trip.getAvailableSeats() + ride.getSeatsBooked() - newSeatsBooked);
	        tripRepository.save(trip);

	        ride.setSeatsBooked(newSeatsBooked);
	        return rideRepository.save(ride);
	}

	public void cancelRide(int rideId) {
		 Ride ride = rideRepository.findById(rideId)
	                .orElseThrow(() -> new RuntimeException("Ride not found"));

	        // Update available seats in the trip
	        Trip trip = ride.getTrip();
	        trip.setAvailableSeats(trip.getAvailableSeats() + ride.getSeatsBooked());
	        tripRepository.save(trip);

	        rideRepository.delete(ride);
	}

	public Ride assignSeatsToRider(int rideId, int seatsToAssign) {
		Ride ride = rideRepository.findById(rideId)
                .orElseThrow(() -> new RuntimeException("Ride not found"));

        if (seatsToAssign > ride.getSeatsBooked()) {
            throw new RuntimeException("Cannot assign more seats than booked");
        }

        ride.setSeatsBooked(seatsToAssign);

        return rideRepository.save(ride);
	}

}
