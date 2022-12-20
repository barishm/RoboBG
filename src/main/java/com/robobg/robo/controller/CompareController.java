package com.robobg.robo.controller;

import com.robobg.robo.service.RobotService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;

@org.springframework.stereotype.Controller
public class CompareController {
    private RobotService robotService;

    @Autowired
    public CompareController(RobotService robotService) {
        super();
        this.robotService = robotService;
    }



    @GetMapping("/compare")
    public String listRobots(Model model){
        model.addAttribute("robots",robotService.getAllRobots());
        return "compare";
    }



}
