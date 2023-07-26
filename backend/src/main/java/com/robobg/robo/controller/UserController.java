package com.robobg.robo.controller;

import com.robobg.robo.entity.Robot;
import com.robobg.robo.entity.dtos.RobotIdModelImageDTO;
import com.robobg.robo.entity.dtos.RobotIdModelImageMostPopularDTO;
import com.robobg.robo.entity.dtos.RobotIdModelMostComparedDTO;
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
    public Optional<List<RobotIdModelImageDTO>> getRobotsIdAndModel() {
        return robotService.getAllRobots();
    }

    @GetMapping("/allMostPopular")
    public Optional<List<RobotIdModelImageMostPopularDTO>> FindAllMostPopular() {
        return robotService.findAllMostPopular();
    }

    @GetMapping("/allMostCompared")
    public Optional<List<RobotIdModelMostComparedDTO>> findAllMostCompared() {return robotService.findAllMostCompared();}

    @GetMapping("/robots")
    public Optional<List<Robot>> getAllRobotsByIds(@RequestParam("ids") List<Long> ids){
        return robotService.findByIdIn(ids);
    }

    @GetMapping("/robot")
    public Optional<Robot> getRobotById(@RequestParam("id") Long id){
        return robotService.getRobotById(id);
    }
}
