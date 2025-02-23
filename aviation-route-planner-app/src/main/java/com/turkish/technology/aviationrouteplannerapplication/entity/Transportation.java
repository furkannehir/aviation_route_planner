package com.turkish.technology.aviationrouteplannerapplication.entity;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;


@Entity
@Table(name = "transportations")
@Getter
@Setter
@NoArgsConstructor
public class Transportation {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "origin_id", nullable = false)
    private Location origin; // Start location

    @ManyToOne
    @JoinColumn(name = "destination_id", nullable = false)
    private Location destination; // End location

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private TransportationType transportationType; // FLIGHT, BUS, etc.
}
