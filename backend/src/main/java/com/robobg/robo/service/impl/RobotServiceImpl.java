package com.robobg.robo.service.impl;

import com.robobg.robo.entity.Robot;
import com.robobg.robo.entity.dtos.RobotIdModelDTO;
import com.robobg.robo.repository.RobotRepository;
import com.robobg.robo.service.RobotService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class RobotServiceImpl implements RobotService {


    private RobotRepository robotRepository;

    @Autowired
    public RobotServiceImpl(RobotRepository robotRepository) {
        super();
        this.robotRepository = robotRepository;
    }
    @Override
    public Optional<List<Robot>> findByIdIn(List<Long> ids) {
        return robotRepository.findByIdIn(ids);
    }

    @Override
    public Optional<List<RobotIdModelDTO>> getAllRobots() {
        return Optional.of(robotRepository.findAll().stream().map(this::convertEntityToDto).collect(Collectors.toList()));
    }

    @Override
    public Robot saveRobot(Robot robot) {
        return robotRepository.save(robot);
    }

    @Override
    public Optional<Robot> getRobotById(Long id) {
        return robotRepository.findById(id);
    }

    @Override
    public void deleteRobotById(Long id) {
        robotRepository.deleteById(id);
    }

    private RobotIdModelDTO convertEntityToDto(Robot robot) {
        RobotIdModelDTO robotIdModelDTO = new RobotIdModelDTO();
        robotIdModelDTO.setId(robot.getId());
        robotIdModelDTO.setModel(robot.getModel());

        return robotIdModelDTO;
    }
}
