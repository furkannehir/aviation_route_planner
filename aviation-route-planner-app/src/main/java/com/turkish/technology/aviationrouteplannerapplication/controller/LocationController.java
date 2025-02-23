package com.turkish.technology.aviationrouteplannerapplication.controller;

import com.turkish.technology.aviationrouteplannerapplication.entity.Location;
import com.turkish.technology.aviationrouteplannerapplication.service.LocationService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/v1/locations")
public class LocationController {

    private final LocationService locationService;

    @Autowired
    public LocationController(LocationService locationService) {
        this.locationService = locationService;
    }

    /**
     * Get all locations.
     */
    @GetMapping
    public ResponseEntity<List<Location>> getAllLocations() {
        return ResponseEntity.ok(locationService.getAllLocations());
    }

    /**
     * Get location by id.
     * @param id location id
     */
    @GetMapping("/{id}")
    public ResponseEntity<Location> getLocationById(@PathVariable(name = "id") Long id) {
        Optional<Location> location = locationService.getLocationById(id);
        return location.map(ResponseEntity::ok)
                .orElseGet(() -> ResponseEntity.notFound().build());
    }

    /**
     * Create a new location.
     * @param location location object
     */
    @PostMapping
    public ResponseEntity<Location> createLocation(@RequestBody Location location) {
        return ResponseEntity.ok(locationService.saveLocation(location));
    }

    /**
     * Update location by id.
     * @param id location id
     * @param location location object
     */
    @PutMapping("/{id}")
    public ResponseEntity<Location> updateLocation(@PathVariable(name = "id") Long id, @RequestBody Location location) {
        Optional<Location> existingLocation = locationService.getLocationById(id);
        if (existingLocation.isEmpty()) {
            return ResponseEntity.notFound().build();
        }
        location.setId(id);
        return ResponseEntity.ok(locationService.saveLocation(location));
    }

    /**
     * Delete location by id.
     * @param id location id
     */
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteLocation(@PathVariable(name = "id") Long id) {
        locationService.deleteLocation(id);
        return ResponseEntity.noContent().build();
    }
}
