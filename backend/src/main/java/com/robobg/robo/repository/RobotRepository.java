package com.robobg.robo.repository;

import com.robobg.robo.entity.Robot;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface RobotRepository extends JpaRepository<Robot,Long> {



    List<Robot> findByIdIn(List<Long> ids);

}
