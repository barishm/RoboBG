package com.robobg.robo.repository;

import com.robobg.robo.entity.MoppingFeatures;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface MoppingFeaturesRepository extends JpaRepository<MoppingFeatures,Long> {
}
