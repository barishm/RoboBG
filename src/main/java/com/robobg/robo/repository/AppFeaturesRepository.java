package com.robobg.robo.repository;


import com.robobg.robo.entity.AppFeatures;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface AppFeaturesRepository extends JpaRepository<AppFeatures,Long> {
}
