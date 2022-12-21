package com.robobg.robo.controller;


import com.robobg.robo.entity.Robot;
import com.robobg.robo.service.RobotService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;


@org.springframework.stereotype.Controller
public class CompareController {
    private RobotService robotService;

    @Autowired
    public CompareController(RobotService robotService) {
        super();
        this.robotService = robotService;
    }

    @GetMapping("/compare")
      public String compare() {
        return "compare";
    }







    @GetMapping("/robots")
    public String listRobots(Model model) {
        model.addAttribute("robots", robotService.getAllRobots());
        return "robots";
    }







}
