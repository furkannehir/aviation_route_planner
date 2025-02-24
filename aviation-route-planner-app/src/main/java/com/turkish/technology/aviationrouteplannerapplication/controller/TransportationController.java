package com.turkish.technology.aviationrouteplannerapplication.controller;

import com.turkish.technology.aviationrouteplannerapplication.dto.TransportationDto;
import com.turkish.technology.aviationrouteplannerapplication.entity.Transportation;
import com.turkish.technology.aviationrouteplannerapplication.service.TransportationService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/v1/transportations")
public class TransportationController {

    private final TransportationService transportationService;

    @Autowired
    public TransportationController(TransportationService transportationService) {
        this.transportationService = transportationService;
    }

    /**
     * Get all transportations.
     */
    @GetMapping
    public ResponseEntity<List<Transportation>> getAllTransportations() {
        return ResponseEntity.ok(transportationService.getAllTransportations());
    }

    /**
     * Get transportation by id.
     * @param id transportation id
     */
    @GetMapping("/{id}")
    public ResponseEntity<Transportation> getTransportationById(@PathVariable(name = "id") Long id) {
        Optional<Transportation> transportation = transportationService.getTransportationById(id);
        return transportation.map(ResponseEntity::ok)
                .orElseGet(() -> ResponseEntity.notFound().build());
    }

    /**
     * Create a new transportation.
     * @param transportationDto transportation data transfer object
     */
    @PostMapping
    public ResponseEntity<Transportation> createTransportation(@RequestBody TransportationDto transportationDto) {
        return ResponseEntity.ok(transportationService.saveTransportationDto(transportationDto));
    }

    /**
     * Update transportation by id.
     *
     * @param id                transportation id
     * @param transportationDto transportation object
     */
    @PutMapping("/{id}")
    public ResponseEntity<Transportation> updateTransportation(@PathVariable(name = "id") Long id, @RequestBody TransportationDto transportationDto) {
        return ResponseEntity.ok(transportationService.updateTransportation(transportationDto, id));
    }

    /**
     * Delete transportation by id.
     * @param id transportation id
     */
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteTransportation(@PathVariable(name = "id") Long id) {
        transportationService.deleteTransportation(id);
        return ResponseEntity.noContent().build();
    }
}
