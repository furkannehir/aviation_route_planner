package com.turkish.technology.aviationrouteplannerapplication.service;

import com.turkish.technology.aviationrouteplannerapplication.entity.Location;
import com.turkish.technology.aviationrouteplannerapplication.entity.Transportation;
import com.turkish.technology.aviationrouteplannerapplication.entity.TransportationType;
import com.turkish.technology.aviationrouteplannerapplication.repository.LocationRepository;
import com.turkish.technology.aviationrouteplannerapplication.repository.TransportationRepository;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import java.util.List;
import java.util.Optional;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.*;

@ExtendWith(MockitoExtension.class)
class RouteServiceTest {

    @Mock
    private LocationRepository locationRepository;

    @Mock
    private TransportationRepository transportationRepository;

    @InjectMocks
    private RouteService routeService;

    private Location origin;
    private Location destination;
    private Transportation flight;

    @BeforeEach
    void setUp() {
        origin = new Location();
        origin.setId(1L);
        origin.setName("Istanbul Airport");

        destination = new Location();
        destination.setId(2L);
        destination.setName("London Heathrow Airport");

        flight = new Transportation();
        flight.setId(1L);
        flight.setOrigin(origin);
        flight.setDestination(destination);
        flight.setTransportationType(TransportationType.FLIGHT);
    }

    @Test
    void testFindValidRoutes_ShouldReturnValidRoute() {
        when(locationRepository.findById(1L)).thenReturn(Optional.of(origin));
        when(locationRepository.findById(2L)).thenReturn(Optional.of(destination));
        when(transportationRepository.findAll()).thenReturn(List.of(flight));

        List<List<Transportation>> routes = routeService.findValidRoutes(1L, 2L);

        assertFalse(routes.isEmpty());
        assertEquals(1, routes.size());
        assertEquals(1, routes.get(0).size());
        assertEquals(TransportationType.FLIGHT, routes.get(0).get(0).getTransportationType());

        verify(locationRepository, times(1)).findById(1L);
        verify(locationRepository, times(1)).findById(2L);
        verify(transportationRepository, times(1)).findAll();
    }
}
