package com.robobg.robo.service;

import com.robobg.robo.entity.Robot;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public interface RobotService {
    List<Robot> getAllRobots();
    Robot saveRobot(Robot robot);
    Robot getRobotById(Long id);
    void deleteRobotById(Long id);


}
