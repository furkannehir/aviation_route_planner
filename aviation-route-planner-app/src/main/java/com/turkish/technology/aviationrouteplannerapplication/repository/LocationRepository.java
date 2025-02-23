package com.turkish.technology.aviationrouteplannerapplication.repository;

import com.turkish.technology.aviationrouteplannerapplication.entity.Location;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface LocationRepository extends JpaRepository<Location, Long> {
}
