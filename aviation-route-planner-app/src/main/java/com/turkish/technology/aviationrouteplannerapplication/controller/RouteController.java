package com.turkish.technology.aviationrouteplannerapplication.controller;

import com.turkish.technology.aviationrouteplannerapplication.entity.Transportation;
import com.turkish.technology.aviationrouteplannerapplication.service.RouteService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/v1/routes")
public class RouteController {

    private final RouteService routeService;

    @Autowired
    public RouteController(RouteService routeService) {
        this.routeService = routeService;
    }

    /**
     * Get valid routes from one location to another.
     * @param originId origin location id
     * @param destinationId destination location id
     */
    @GetMapping
    public ResponseEntity<List<List<Transportation>>> getRoutes(
            @RequestParam(name = "originId") Long originId,
            @RequestParam(name = "destinationId") Long destinationId) {

        List<List<Transportation>> routes = routeService.findValidRoutes(originId, destinationId);
        if (routes.isEmpty()) {
            return ResponseEntity.notFound().build();
        }
        return ResponseEntity.ok(routes);
    }
}
