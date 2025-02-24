package com.turkish.technology.aviationrouteplannerapplication.dto;

import com.turkish.technology.aviationrouteplannerapplication.entity.DaysOfWeek;
import com.turkish.technology.aviationrouteplannerapplication.entity.TransportationType;
import lombok.Setter;
import lombok.Getter;

import java.util.List;

@Setter
@Getter
public class TransportationDto {
    private Long originId;
    private Long destinationId;
    private TransportationType transportationType;
    private List<DaysOfWeek> transportationDays;

    public String transportationDaysToString() {
        StringBuilder sb = new StringBuilder();
        for (DaysOfWeek transportationDay : transportationDays) {
            sb.append(transportationDay.toString()).append(",");
        }
        return sb.toString();
    }
}
