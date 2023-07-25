package com.robobg.robo.repository;

import com.robobg.robo.entity.Robot;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface RobotRepository extends JpaRepository<Robot,Long> {
    @Override
    List<Robot> findAll();

    Optional<List<Robot>> findByIdIn(List<Long> ids);
    @Query("FROM Robot r WHERE r.mostPopular IS NOT NULL")
    List<Robot> findAllMostPopular();

    @Query("FROM Robot r WHERE r.mostCompared IS NOT NULL")
    List<Robot> findAllMostCompared();


}
