package com.orbirides.backend.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.orbirides.backend.entity.Trip;
import com.orbirides.backend.enums.TripStatus;

import java.util.List;

@Repository
public interface TripRepository extends JpaRepository<Trip, Integer> {

    // Find all trips by driver ID
    List<Trip> findByDriverId(Long driverId);

    // Find all trips by trip status (Scheduled, Ongoing, Completed, etc.)
    List<Trip> findByTripStatus(TripStatus tripStatus);

    // Find available trips based on start and end locations
  
    @Query("SELECT t FROM Trip t WHERE t.startLocation = :startLocation AND t.endLocation = :endLocation AND t.tripStatus = :status")
    List<Trip> findByStartLocationAndEndLocationAndTripStatus(
            @Param("startLocation") String startLocation,
            @Param("endLocation") String endLocation,
            @Param("status") TripStatus status);

}

