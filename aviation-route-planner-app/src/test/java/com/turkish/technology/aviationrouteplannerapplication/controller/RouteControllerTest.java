package com.turkish.technology.aviationrouteplannerapplication.controller;

import com.turkish.technology.aviationrouteplannerapplication.entity.Location;
import com.turkish.technology.aviationrouteplannerapplication.entity.Transportation;
import com.turkish.technology.aviationrouteplannerapplication.entity.TransportationType;
import com.turkish.technology.aviationrouteplannerapplication.service.RouteService;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.MockitoAnnotations;
import org.mockito.Spy;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.http.ResponseEntity;

import java.util.List;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.*;

@ExtendWith(MockitoExtension.class)  // ✅ Enables Mockito Annotations
class RouteControllerTest {

    @Spy
    @InjectMocks
    private RouteService routeService;

    @InjectMocks
    private RouteController routeController;

    private Transportation flight;
    private Location origin;
    private Location destination;

    @BeforeEach
    void setUp() {
        MockitoAnnotations.openMocks(this);

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
    void testGetRoutes_ShouldReturnValidRoutes() {
        List<List<Transportation>> mockRoutes = List.of(List.of(flight));

        when(routeService.findValidRoutes(1L, 2L, "2021-12-01")).thenReturn(mockRoutes);

        ResponseEntity<List<List<Transportation>>> response = routeController.getRoutes(1L, 2L, "2021-12-01");

        assertEquals(200, response.getStatusCode().value(), "Response should be 200 OK");
        assertNotNull(response.getBody(), "Response body should not be null");
        assertEquals(1, response.getBody().size(), "There should be one route in the response");
        assertEquals(TransportationType.FLIGHT, response.getBody().get(0).get(0).getTransportationType());

        verify(routeService, times(1)).findValidRoutes(1L, 2L, "2021-12-01");
    }

    @Test
    void testGetRoutes_ShouldReturnNotFound_WhenNoRoutes() {
        when(routeService.findValidRoutes(1L, 2L, "2021-12-01")).thenReturn(List.of());

        ResponseEntity<List<List<Transportation>>> response = routeController.getRoutes(1L, 2L, "2021-12-01");

        assertEquals(404, response.getStatusCode().value(), "Response should be 404 Not Found");
    }
}
