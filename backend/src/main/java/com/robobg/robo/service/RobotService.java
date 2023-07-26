package com.robobg.robo.service;

import com.robobg.robo.entity.Robot;
import com.robobg.robo.entity.dtos.RobotIdModelImageDTO;
import com.robobg.robo.entity.dtos.RobotIdModelImageMostPopularDTO;
import com.robobg.robo.entity.dtos.RobotIdModelMostComparedDTO;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public interface RobotService {
    Optional<List<RobotIdModelImageDTO>> getAllRobots();
    Robot saveRobot(Robot robot);
    Optional<Robot> getRobotById(Long id);
    void deleteRobotById(Long id);
    Optional<List<Robot>> findByIdIn(List<Long> ids);
    Optional<List<RobotIdModelImageMostPopularDTO>> findAllMostPopular();


    Optional<List<RobotIdModelMostComparedDTO>> findAllMostCompared();
}
