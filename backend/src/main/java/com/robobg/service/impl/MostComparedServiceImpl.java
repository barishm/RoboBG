package com.robobg.service.impl;

import com.robobg.entity.MostCompared;
import com.robobg.entity.Robot;
import com.robobg.entity.dtos.CreateMostComparedDTO;
import com.robobg.entity.dtos.MostComparedDTO;
import com.robobg.entity.dtos.UpdateMostComparedDTO;
import com.robobg.repository.MostComparedRepository;
import com.robobg.repository.RobotRepository;
import com.robobg.service.MostComparedService;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Comparator;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class MostComparedServiceImpl implements MostComparedService {
    private final MostComparedRepository mostComparedRepository;
    private final RobotRepository robotRepository;
    private final ModelMapper modelMapper;

    @Autowired
    public MostComparedServiceImpl(MostComparedRepository mostComparedRepository, RobotRepository robotRepository, ModelMapper modelMapper) {
        this.mostComparedRepository = mostComparedRepository;
        this.robotRepository = robotRepository;
        this.modelMapper = modelMapper;
    }

    public List<MostComparedDTO> getAll() {
        return mostComparedRepository.findAll().stream()
                .map(mostCompared -> modelMapper.map(mostCompared, MostComparedDTO.class))
                .sorted(Comparator.comparing(MostComparedDTO::getOrder))
                .collect(Collectors.toList());
    }

    @Override
    public void createMostCompared(CreateMostComparedDTO createMostComparedDTO) {
        MostCompared mostCompared = new MostCompared();
        long robot1Id = createMostComparedDTO.getRobot1();
        long robot2Id = createMostComparedDTO.getRobot2();
        long robot3Id = createMostComparedDTO.getRobot3();
        if(robot1Id != 0 && robot2Id != 0 && robot3Id != 0){
            Optional<Robot> robot1 = robotRepository.findById(robot1Id);
            Optional<Robot> robot2 = robotRepository.findById(robot2Id);
            Optional<Robot> robot3 = robotRepository.findById(robot2Id);
            if(robot1.isPresent() && robot2.isPresent() && robot3.isPresent()){
                Robot robotOne = robot1.get();
                Robot robotTwo = robot2.get();
                Robot robotThree = robot3.get();
                mostCompared.setRobot1(robotOne);
                mostCompared.setRobot2(robotTwo);
                mostCompared.setRobot3(robotThree);
                mostCompared.setOrder(createMostComparedDTO.getOrder());
                mostComparedRepository.save(mostCompared);
            } else {
                System.out.println("Robot not found!");
            }

        } else if(robot1Id != 0 && robot2Id != 0){
            Optional<Robot> robot1 = robotRepository.findById(robot1Id);
            Optional<Robot> robot2 = robotRepository.findById(robot2Id);
            if(robot1.isPresent() && robot2.isPresent()){
                Robot robotOne = robot1.get();
                Robot robotTwo = robot2.get();
                mostCompared.setRobot1(robotOne);
                mostCompared.setRobot2(robotTwo);
                mostCompared.setOrder(createMostComparedDTO.getOrder());
                mostComparedRepository.save(mostCompared);
            } else {
                System.out.println("Robot not found!");
            }
        } else {
            System.out.println("Something went wrong!");
        }
    }

    @Override
    public void updateMostCompared(UpdateMostComparedDTO updateMostComparedDTO) {
        MostCompared mostCompared = new MostCompared();
        mostCompared.setId(updateMostComparedDTO.getId());
        long robot1Id = updateMostComparedDTO.getRobot1();
        long robot2Id = updateMostComparedDTO.getRobot2();
        long robot3Id = updateMostComparedDTO.getRobot3();
        if(robot1Id != 0 && robot2Id != 0 && robot3Id != 0){
            Optional<Robot> robot1 = robotRepository.findById(robot1Id);
            Optional<Robot> robot2 = robotRepository.findById(robot2Id);
            Optional<Robot> robot3 = robotRepository.findById(robot2Id);
            if(robot1.isPresent() && robot2.isPresent() && robot3.isPresent()){
                Robot robotOne = robot1.get();
                Robot robotTwo = robot2.get();
                Robot robotThree = robot3.get();
                mostCompared.setRobot1(robotOne);
                mostCompared.setRobot2(robotTwo);
                mostCompared.setRobot3(robotThree);
                mostCompared.setOrder(updateMostComparedDTO.getOrder());
                mostComparedRepository.save(mostCompared);
            } else {
                System.out.println("Robot not found!");
            }

        } else if(robot1Id != 0 && robot2Id != 0){
            Optional<Robot> robot1 = robotRepository.findById(robot1Id);
            Optional<Robot> robot2 = robotRepository.findById(robot2Id);
            if(robot1.isPresent() && robot2.isPresent()){
                Robot robotOne = robot1.get();
                Robot robotTwo = robot2.get();
                mostCompared.setRobot1(robotOne);
                mostCompared.setRobot2(robotTwo);
                mostCompared.setOrder(updateMostComparedDTO.getOrder());
                mostComparedRepository.save(mostCompared);
            } else {
                System.out.println("Robot not found!");
            }
        } else {
            System.out.println("Something went wrong!");
        }
    }

    @Override
    public void deleteMostCompared(Long id) {
        mostComparedRepository.deleteById(id);
    }
}
