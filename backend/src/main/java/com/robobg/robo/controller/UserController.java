package com.robobg.robo.controller;

import com.robobg.robo.entity.Robot;
import com.robobg.robo.entity.dtos.RobotIdModelDTO;
import com.robobg.robo.service.RobotService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@CrossOrigin
@RequestMapping("/get")
public class UserController {
    private RobotService robotService;

    @Autowired
    public UserController(RobotService robotService) {
        this.robotService = robotService;
    }

    @GetMapping
    public Optional<List<RobotIdModelDTO>> getRobotsIdAndModel() {
        return robotService.getAllRobots();
    }

    @GetMapping("/robots")
    public Optional<List<Robot>> getAllRobotsByIds(@RequestParam("ids") List<Long> ids){
        return robotService.findByIdIn(ids);
    }

    @GetMapping("/robot")
    public Optional<Robot> getRobotById(@RequestParam("id") Long id){
        return robotService.getRobotById(id);
    }
}
