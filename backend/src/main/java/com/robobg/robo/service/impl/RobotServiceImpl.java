package com.robobg.robo.service.impl;

import com.robobg.robo.entity.Robot;
import com.robobg.robo.entity.dtos.RobotIdModelImageDTO;
import com.robobg.robo.repository.RobotRepository;
import com.robobg.robo.service.RobotService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

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
    public Optional<List<RobotIdModelImageDTO>> findAllMostPopular() {
        return Optional.of(robotRepository.findAllMostPopular().stream().map(this::convertEntityToDto).collect(Collectors.toList()));
    }

    @Override
    public Optional<List<RobotIdModelImageDTO>> findAllMostCompared() {
        return Optional.of(robotRepository.findAllMostCompared().stream().map(this::convertEntityToDto).collect(Collectors.toList()));
    }

    @Override
    public Optional<List<RobotIdModelImageDTO>> getAllRobots() {
        return Optional.of(robotRepository.findAll().stream().map(this::convertEntityToDto).collect(Collectors.toList()));
    }

    @Override
    public Robot saveRobot(Robot robot) {
        System.out.println();
        ObjectUtils.setEmptyStringsToNull(robot);
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

    private RobotIdModelImageDTO convertEntityToDto(Robot robot) {
        RobotIdModelImageDTO robotIdModelImageDTO = new RobotIdModelImageDTO();
        robotIdModelImageDTO.setId(robot.getId());
        robotIdModelImageDTO.setModel(robot.getModel());
        robotIdModelImageDTO.setImage(robot.getImage());

        return robotIdModelImageDTO;
    }
}
