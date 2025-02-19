package com.orbirides.backend.services;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.orbirides.backend.entity.RideRequest;
import com.orbirides.backend.entity.Trip;
import com.orbirides.backend.entity.User;
import com.orbirides.backend.enums.RideStatus;
import com.orbirides.backend.repository.RideRequestRepository;
import com.orbirides.backend.repository.TripRepository;
import com.orbirides.backend.repository.UserRepository;



@Service
public class RideRequestService{

	@Autowired
	private RideRequestRepository rideRequestRepository;
	@Autowired
    private TripRepository tripRepository;
	@Autowired
    private UserRepository userRepository;
	
	
	public RideRequest requestRide(RideRequest rideRequest) {
		
		Trip trip = tripRepository.findById(rideRequest.getTrip().getTripId())
                .orElseThrow(() -> new RuntimeException("Trip not found"));

        User rider = userRepository.findById(rideRequest.getRider().getUserId())
                .orElseThrow(() -> new RuntimeException("User not found"));

        if (trip.getAvailableSeats() < rideRequest.getSeatsRequested()) {
            throw new RuntimeException("Not enough available seats");
        }

        RideRequest rideReq = RideRequest.builder()
                .trip(trip)
                .rider(rider)
                .seatsRequested(rideRequest.getSeatsRequested())
                .status(RideStatus.PENDING)
                .build();

        return rideRequestRepository.save(rideReq);
	}

	public List<RideRequest> getRideRequestsForTrip(int tripId) {
		return rideRequestRepository.findByTripTripId(tripId);
	}

	public List<RideRequest> getRideRequestsForRider(Long riderId) {
		return rideRequestRepository.findByRiderUserId(riderId);
	}

	public RideRequest updateRideRequestStatus(Long requestId, RideStatus status) {
		
		RideRequest rideRequest = rideRequestRepository.findById(requestId)
                .orElseThrow(() -> new RuntimeException("Ride request not found"));

        if (status == RideStatus.ACCEPTED) {
            Trip trip = rideRequest.getTrip();
            if (trip.getAvailableSeats() < rideRequest.getSeatsRequested()) {
                throw new RuntimeException("Not enough seats available");
            }
            trip.setAvailableSeats(trip.getAvailableSeats() - rideRequest.getSeatsRequested());
            tripRepository.save(trip);
        }

        rideRequest.setStatus(status);
        return rideRequestRepository.save(rideRequest);
	}

	public void cancelRideRequest(Long requestId) {
		 RideRequest rideRequest = rideRequestRepository.findById(requestId)
	                .orElseThrow(() -> new RuntimeException("Ride request not found"));

	        if (rideRequest.getStatus() == RideStatus.ACCEPTED) {
	            Trip trip = rideRequest.getTrip();
	            trip.setAvailableSeats(trip.getAvailableSeats() + rideRequest.getSeatsRequested());
	            tripRepository.save(trip);
	        }

	        rideRequest.setStatus(RideStatus.CANCELLED);
	        rideRequestRepository.save(rideRequest);

	}

	public Optional<RideRequest> getRideRequestStatus(Long requestId) {
		return rideRequestRepository.findById(requestId);
	}

}
