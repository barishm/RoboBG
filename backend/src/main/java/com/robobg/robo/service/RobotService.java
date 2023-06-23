package com.robobg.robo.service;

import com.robobg.robo.entity.Robot;
import com.robobg.robo.entity.dtos.RobotIdModelDTO;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public interface RobotService {
    List<RobotIdModelDTO> getAllRobots();
    Robot saveRobot(Robot robot);
    Optional<Robot> getRobotById(Long id);
    void deleteRobotById(Long id);
    List<Robot> findByIdIn(List<Long> ids);



}
