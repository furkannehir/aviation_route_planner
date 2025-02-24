package com.turkish.technology.aviationrouteplannerapplication.entity;

import java.util.Arrays;
import java.util.List;
import java.util.stream.Collectors;

public enum DaysOfWeek {
    MONDAY,
    TUESDAY,
    WEDNESDAY,
    THURSDAY,
    FRIDAY,
    SATURDAY,
    SUNDAY;

    public static List<DaysOfWeek> fromStringList(String days) {
        return Arrays.stream(days.split(","))
                .map(DaysOfWeek::valueOf)
                .collect(Collectors.toList());
    }
}
