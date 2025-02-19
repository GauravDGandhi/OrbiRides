package com.orbirides.backend.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.orbirides.backend.entity.TripStop;

@Repository	
public interface TripStopRepository extends JpaRepository<TripStop,Integer> {
	List<TripStop> findByTripTripIdOrderByStopOrder(int tripId);
}
