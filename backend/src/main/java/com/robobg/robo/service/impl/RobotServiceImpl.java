package com.robobg.robo.service.impl;

import com.robobg.robo.entity.Robot;
import com.robobg.robo.entity.dtos.RobotIdModelImageDTO;
import com.robobg.robo.entity.dtos.RobotIdModelImageMostPopularDTO;
import com.robobg.robo.entity.dtos.RobotIdModelMostComparedDTO;
import com.robobg.robo.repository.RobotRepository;
import com.robobg.robo.service.RobotService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Comparator;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class RobotServiceImpl implements RobotService {


    private final RobotRepository robotRepository;


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
    public Optional<List<RobotIdModelImageMostPopularDTO>> findAllMostPopular() {
        return Optional.of(robotRepository.findAllMostPopular().stream().map(this::convertEntityToRobotIdModelImageMostPopularDTO).sorted(Comparator.comparingInt(RobotIdModelImageMostPopularDTO::getMostPopular)).collect(Collectors.toList()));
    }

    @Override
    public Optional<List<RobotIdModelMostComparedDTO>> findAllMostCompared() {
        return Optional.of(robotRepository.findAllMostCompared().stream().map(this::convertEntityToRobotIdModelMostComparedDTO).sorted(Comparator.comparingInt(RobotIdModelMostComparedDTO::getMostCompared)).collect(Collectors.toList()));
    }

    @Override
    public Optional<List<RobotIdModelImageDTO>> getAllRobots() {
        return Optional.of(robotRepository.findAll().stream().map(this::convertEntityToRobotIdModelImageDTO).collect(Collectors.toList()));
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

    private RobotIdModelImageDTO convertEntityToRobotIdModelImageDTO(Robot robot) {
        RobotIdModelImageDTO robotIdModelImageDTO = new RobotIdModelImageDTO();
        robotIdModelImageDTO.setId(robot.getId());
        robotIdModelImageDTO.setModel(robot.getModel());
        robotIdModelImageDTO.setImage(robot.getImage());
        return robotIdModelImageDTO;
    }
    private RobotIdModelImageMostPopularDTO convertEntityToRobotIdModelImageMostPopularDTO(Robot robot) {
        RobotIdModelImageMostPopularDTO robotIdModelImageMostPopularDTO = new RobotIdModelImageMostPopularDTO();
        robotIdModelImageMostPopularDTO.setId(robot.getId());
        robotIdModelImageMostPopularDTO.setModel(robot.getModel());
        robotIdModelImageMostPopularDTO.setImage(robot.getImage());
        robotIdModelImageMostPopularDTO.setMostPopular(robot.getMostPopular());
        return robotIdModelImageMostPopularDTO;
    }
    private RobotIdModelMostComparedDTO convertEntityToRobotIdModelMostComparedDTO(Robot robot) {
        RobotIdModelMostComparedDTO robotIdModelMostComparedDTO = new RobotIdModelMostComparedDTO();
        robotIdModelMostComparedDTO.setId(robot.getId());
        robotIdModelMostComparedDTO.setModel(robot.getModel());
        robotIdModelMostComparedDTO.setMostCompared(robot.getMostCompared());
        return robotIdModelMostComparedDTO;
    }

}
