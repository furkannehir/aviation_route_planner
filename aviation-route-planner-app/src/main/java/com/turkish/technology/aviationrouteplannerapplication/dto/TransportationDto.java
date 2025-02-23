package com.turkish.technology.aviationrouteplannerapplication.dto;

import lombok.Setter;
import lombok.Getter;

@Setter
@Getter
public class TransportationDto {
    private Long originId;
    private Long destinationId;
    private String transportationType;
}
