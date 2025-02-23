package com.turkish.technology.aviationrouteplannerapplication.service;

import com.turkish.technology.aviationrouteplannerapplication.dto.TransportationDto;
import com.turkish.technology.aviationrouteplannerapplication.entity.Location;
import com.turkish.technology.aviationrouteplannerapplication.entity.Transportation;
import com.turkish.technology.aviationrouteplannerapplication.entity.TransportationType;
import com.turkish.technology.aviationrouteplannerapplication.repository.TransportationRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class TransportationService {

    private final TransportationRepository transportationRepository;
    private final LocationService locationService;

    @Autowired
    public TransportationService(TransportationRepository transportationRepository, LocationService locationService) {
        this.transportationRepository = transportationRepository;
        this.locationService = locationService;
    }

    public List<Transportation> getAllTransportations() {
        return transportationRepository.findAll();
    }

    public Optional<Transportation> getTransportationById(Long id) {
        return transportationRepository.findById(id);
    }

    public Transportation saveTransportationDto(TransportationDto transportationDto) {
        Location origin = this.locationService.getLocationById(transportationDto.getOriginId()).orElseThrow();
        Location destination = this.locationService.getLocationById(transportationDto.getDestinationId()).orElseThrow();
        Transportation transportation = new Transportation();
        transportation.setOrigin(origin);
        transportation.setDestination(destination);
        transportation.setTransportationType(TransportationType.valueOf(transportationDto.getTransportationType()));
        return transportationRepository.save(transportation);
    }

    public Transportation saveTransportation(Transportation transportation) {
        return transportationRepository.save(transportation);
    }

    public void deleteTransportation(Long id) {
        transportationRepository.deleteById(id);
    }
}
