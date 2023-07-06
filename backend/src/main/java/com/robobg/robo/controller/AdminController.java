package com.robobg.robo.controller;

import com.robobg.robo.entity.Robot;
import com.robobg.robo.entity.dtos.RobotIdModelDTO;
import com.robobg.robo.service.RobotService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.awt.*;
import java.util.List;

@RestController
@CrossOrigin
@RequestMapping("/admin")
public class AdminController {
    private RobotService robotService;

    @Autowired
    public AdminController(RobotService robotService) {
        this.robotService = robotService;
    }

    @DeleteMapping
    public void deleteRobotById (@RequestParam("id") Long id) {
        robotService.deleteRobotById(id);
    }

    @PostMapping
    public void createRobot (@RequestBody Robot robot) {
        robotService.saveRobot(robot);
    }

    @PutMapping("/update")
    public void updateRobot(@RequestBody Robot robot){
        robotService.saveRobot(robot);
    }




}
