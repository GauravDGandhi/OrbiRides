package com.orbirides.backend.services;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.orbirides.backend.entity.Trip;
import com.orbirides.backend.entity.TripStop;
import com.orbirides.backend.repository.TripRepository;
import com.orbirides.backend.repository.TripStopRepository;




@Service
public class TripStopService {

	@Autowired
	TripRepository tripRepository;
	
	@Autowired
	TripStopRepository tripStopRepository;
	
	/** Create a New Trip Stop **/
    public TripStop createTripStop(TripStop tripStop) {
    	Trip trip = tripRepository.findById(tripStop.getTrip().getTripId())
                .orElseThrow(() -> new RuntimeException("Trip not found"));

        TripStop enitityTripStop = TripStop.builder()
                .trip(trip)
                .stopLocation(tripStop.getStopLocation())
                .stopOrder(tripStop.getStopOrder())
                .stopTime(tripStop.getStopTime())
                .build();

        return tripStopRepository.save(enitityTripStop);
    }
    
    /**  Get All Stops for a Specific Trip **/      
    public List<TripStop> getStopsByTrip(int tripId){
    	return tripStopRepository.findByTripTripIdOrderByStopOrder(tripId);
    }
    

    /** Get Specific Stop Details **/
    public Optional<TripStop> getStopDetails(int stopId){
    	return tripStopRepository.findById(stopId);
    }
    
    
    /** Update Trip Stop Information **/
    public TripStop updateTripStop(int stopId,TripStop updatedStop) {
    	TripStop tripStop = tripStopRepository.findById(stopId)
                .orElseThrow(() -> new RuntimeException("Stop not found"));

        tripStop.setStopLocation(updatedStop.getStopLocation());
        tripStop.setStopOrder(updatedStop.getStopOrder());
        tripStop.setStopTime(updatedStop.getStopTime());

        return tripStopRepository.save(tripStop);
    }
    
    /**  Delete a Trip Stop **/
    public void deleteTripStop(int stopId) {
    	TripStop tripStop = tripStopRepository.findById(stopId)
                .orElseThrow(() -> new RuntimeException("Stop not found"));

        tripStopRepository.delete(tripStop);
    }
    
    
}
