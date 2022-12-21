package com.robobg.robo.repository;

import com.robobg.robo.entity.Battery;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface BatteryRepository extends JpaRepository<Battery,Long> {
}
