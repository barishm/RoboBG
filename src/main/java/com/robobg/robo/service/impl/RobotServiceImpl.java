package com.robobg.robo.service.impl;

import com.robobg.robo.entity.Robot;
import com.robobg.robo.repository.RobotRepository;
import com.robobg.robo.service.RobotService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class RobotServiceImpl implements RobotService {

    private RobotRepository robotRepository;

    @Autowired
    public RobotServiceImpl(RobotRepository robotRepository) {
        super();
        this.robotRepository = robotRepository;
    }


    @Override
    public List<Robot> getAllRobots() {
        return robotRepository.findAll();
    }

    @Override
    public Robot saveRobot(Robot robot) {
        return robotRepository.save(robot);
    }

    @Override
    public Robot getRobotById(Long id) {
        return robotRepository.findById(id).get();
    }

    @Override
    public void deleteRobotById(Long id) {
        robotRepository.deleteById(id);

    }

    @Override
    public Robot getRobotByModel(String model) {
        return robotRepository.findRobotByModel(model);
    }



}
