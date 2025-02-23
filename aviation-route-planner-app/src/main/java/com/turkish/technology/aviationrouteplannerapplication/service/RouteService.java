package com.turkish.technology.aviationrouteplannerapplication.service;

import com.turkish.technology.aviationrouteplannerapplication.entity.Location;
import com.turkish.technology.aviationrouteplannerapplication.entity.Transportation;
import com.turkish.technology.aviationrouteplannerapplication.entity.TransportationType;
import com.turkish.technology.aviationrouteplannerapplication.repository.LocationRepository;
import com.turkish.technology.aviationrouteplannerapplication.repository.TransportationRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.*;

@Service
public class RouteService {

    private final LocationRepository locationRepository;
    private final TransportationRepository transportationRepository;
    private List<Transportation> allTransportations;

    @Autowired
    public RouteService(LocationRepository locationRepository, TransportationRepository transportationRepository) {
        this.locationRepository = locationRepository;
        this.transportationRepository = transportationRepository;
        this.allTransportations = transportationRepository.findAll();
    }

    /**
     * Find all valid routes from origin to destination.
     */
    public List<List<Transportation>> findValidRoutes(Long originId, Long destinationId) {
        Optional<Location> origin = locationRepository.findById(originId);
        Optional<Location> destination = locationRepository.findById(destinationId);

        if (origin.isEmpty() || destination.isEmpty()) {
            return Collections.emptyList(); // Return empty if locations not found
        }

        List<List<Transportation>> validRoutes = new ArrayList<>();
        allTransportations = transportationRepository.findAll();
        findRoutesRecursive(origin.get(), destination.get(), new LinkedList<>(), validRoutes);
        return validRoutes;
    }

    private void findRoutesRecursive(Location current, Location destination, List<Transportation> path, List<List<Transportation>> validRoutes) {
        if (path.size() > 3) return; // Rule: max 3 transportations
        if (current.equals(destination)) {
            if (isValidRoute(path)) {
                validRoutes.add(new ArrayList<>(path));
            }
            return;
        }

        for (Transportation transport : allTransportations) {
            if (transport.getOrigin().equals(current) && !path.contains(transport)) {
                path.add(transport);
                findRoutesRecursive(transport.getDestination(), destination, path, validRoutes);
                path.remove(path.size() - 1);
            }
        }
    }

    private boolean isValidRoute(List<Transportation> route) {
        if (route.isEmpty()) return false;

        boolean hasFlight = false;
        int beforeFlightTransfers = 0;
        int afterFlightTransfers = 0;

        for (Transportation transport : route) {
            if (transport.getTransportationType() == TransportationType.FLIGHT) {
                if (hasFlight) return false;
                hasFlight = true;
            } else {
                if (!hasFlight) beforeFlightTransfers++;
                else afterFlightTransfers++;
            }
        }

        return hasFlight && beforeFlightTransfers <= 1 && afterFlightTransfers <= 1;
    }
}
