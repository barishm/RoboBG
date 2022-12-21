package com.robobg.robo.repository;

import com.robobg.robo.entity.CleaningFeatures;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface CleaningFeaturesRepository extends JpaRepository<CleaningFeatures,Long> {

}
