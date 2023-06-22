package com.robobg.robo.controller;

import com.robobg.robo.entity.Robot;
import com.robobg.robo.entity.dtos.RobotIdModelDTO;
import com.robobg.robo.service.RobotService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import java.util.List;

@RestController
@RequestMapping("/")
public class UserController {
    private RobotService robotService;

    @Autowired
    public UserController(RobotService robotService) {
        this.robotService = robotService;
    }

    @GetMapping
    public List<RobotIdModelDTO> getRobotsIdAndModel() {
        return robotService.getAllRobots();
    }

    @GetMapping("/robots")
    public List<Robot> getAllRobotsByIds(@RequestParam("ids") List<Long> ids){
        return robotService.findByIdIn(ids);
    }
}
