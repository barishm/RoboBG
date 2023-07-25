package com.robobg.robo.controller;

import com.robobg.robo.entity.Robot;
import com.robobg.robo.service.RobotService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;


@RestController
@CrossOrigin(origins = "http://localhost:3000/")
@RequestMapping("/admin")
public class AdminController {
    private RobotService robotService;

    @Autowired
    public AdminController(RobotService robotService) {
        this.robotService = robotService;
    }

    @DeleteMapping("/delete")
    public void deleteRobotById (@RequestParam("id") Long id) {
        robotService.deleteRobotById(id);
    }

    @PostMapping("/create")
    public void createRobot (@RequestBody Robot robot) {
        robotService.saveRobot(robot);
    }

    @PutMapping("/update")
    public void updateRobot(@RequestBody Robot robot){
        robotService.saveRobot(robot);
    }





}
