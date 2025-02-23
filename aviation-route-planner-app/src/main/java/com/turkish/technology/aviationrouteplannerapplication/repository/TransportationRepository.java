package com.turkish.technology.aviationrouteplannerapplication.repository;

import com.turkish.technology.aviationrouteplannerapplication.entity.Transportation;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface TransportationRepository extends JpaRepository<Transportation, Long> {
}
