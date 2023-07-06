package com.robobg.robo.repository;

import com.robobg.robo.entity.Robot;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface RobotRepository extends JpaRepository<Robot,Long> {



    Optional<List<Robot>> findByIdIn(List<Long> ids);


}
