package com.turkish.technology.aviationrouteplannerapplication.service;

import com.turkish.technology.aviationrouteplannerapplication.dto.TransportationDto;
import com.turkish.technology.aviationrouteplannerapplication.entity.Location;
import com.turkish.technology.aviationrouteplannerapplication.entity.Transportation;
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
        Transportation transportation = new Transportation();
        enrichTransportation(transportation, transportationDto);
        return transportationRepository.save(transportation);
    }

    public Transportation updateTransportation(TransportationDto transportationDto, Long id) {
        Transportation transportation = transportationRepository.findById(id).orElseThrow();
        enrichTransportation(transportation, transportationDto);
        return transportationRepository.save(transportation);
    }

    public void deleteTransportation(Long id) {
        transportationRepository.deleteById(id);
    }

    private void enrichTransportation(Transportation transportation, TransportationDto transportationDto) {
        Location origin = this.locationService.getLocationById(transportationDto.getOriginId()).orElseThrow();
        Location destination = this.locationService.getLocationById(transportationDto.getDestinationId()).orElseThrow();
        transportation.setOrigin(origin);
        transportation.setDestination(destination);
        transportation.setTransportationType(transportationDto.getTransportationType());
        transportation.setTransportationDays(transportationDto.transportationDaysToString());
    }
}
