package com.orbirides.backend.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.orbirides.backend.entity.Ride;

@Repository
public interface RideRepository extends JpaRepository<Ride, Integer> {
	List<Ride> findByTripTripId(int tripId);
    List<Ride> findByRiderUserId(Long riderId);
}
