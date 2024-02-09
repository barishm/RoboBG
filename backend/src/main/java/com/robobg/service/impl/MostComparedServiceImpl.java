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
        String robot1 = createMostComparedDTO.getRobot1();
        String robot2 = createMostComparedDTO.getRobot2();
        String robot3 = createMostComparedDTO.getRobot3();
        if(robot1 != null && robot2 != null && robot3 != null){
            Optional<Robot> robot1opt = robotRepository.findByModel(robot1);
            Optional<Robot> robot2opt = robotRepository.findByModel(robot2);
            Optional<Robot> robot3opt = robotRepository.findByModel(robot3);
            if(robot1opt.isPresent() && robot2opt.isPresent() && robot3opt.isPresent()){
                Robot robotOne = robot1opt.get();
                Robot robotTwo = robot2opt.get();
                Robot robotThree = robot3opt.get();
                mostCompared.setRobot1(robotOne);
                mostCompared.setRobot2(robotTwo);
                mostCompared.setRobot3(robotThree);
                mostCompared.setOrder(createMostComparedDTO.getOrder());
                mostComparedRepository.save(mostCompared);
            } else {
                System.out.println("Robot not found!");
            }

        } else if(robot1 != null && robot2 != null){
            Optional<Robot> robot1opt = robotRepository.findByModel(robot1);
            Optional<Robot> robot2opt = robotRepository.findByModel(robot2);
            if(robot1opt.isPresent() && robot2opt.isPresent()){
                Robot robotOne = robot1opt.get();
                Robot robotTwo = robot2opt.get();
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
        String robot1 = updateMostComparedDTO.getRobot1();
        String robot2 = updateMostComparedDTO.getRobot2();
        String robot3 = updateMostComparedDTO.getRobot3();
        if(robot1 != null && robot2 != null && robot3 != null){
            Optional<Robot> robot1opt = robotRepository.findByModel(robot1);
            Optional<Robot> robot2opt = robotRepository.findByModel(robot2);
            Optional<Robot> robot3opt = robotRepository.findByModel(robot3);
            if(robot1opt.isPresent() && robot2opt.isPresent() && robot3opt.isPresent()){
                Robot robotOne = robot1opt.get();
                Robot robotTwo = robot2opt.get();
                Robot robotThree = robot3opt.get();
                mostCompared.setRobot1(robotOne);
                mostCompared.setRobot2(robotTwo);
                mostCompared.setRobot3(robotThree);
                mostCompared.setOrder(updateMostComparedDTO.getOrder());
                mostComparedRepository.save(mostCompared);
            } else {
                System.out.println("Robot not found!");
            }

        } else if(robot1 != null && robot2 != null){
            Optional<Robot> robot1opt = robotRepository.findByModel(robot1);
            Optional<Robot> robot2opt = robotRepository.findByModel(robot2);
            if(robot1opt.isPresent() && robot2opt.isPresent()){
                Robot robotOne = robot1opt.get();
                Robot robotTwo = robot2opt.get();
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
