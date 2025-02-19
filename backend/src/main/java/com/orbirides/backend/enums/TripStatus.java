package com.orbirides.backend.enums;



public enum TripStatus {
	SCHEDULED,
    ONGOING,
    COMPLETED,
    CANCELLED;
    
    public static TripStatus fromString(String value) {
        return TripStatus.valueOf(value.toUpperCase());
    }
}
