package com.orbirides.backend.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.orbirides.backend.entity.RideRequest;


@Repository
public interface RideRequestRepository  extends JpaRepository<RideRequest, Long>{
	List<RideRequest> findByTripTripId(int tripId);
    List<RideRequest> findByRiderUserId(Long riderId);
}
