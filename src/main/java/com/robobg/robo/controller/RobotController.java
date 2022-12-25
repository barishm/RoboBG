package com.robobg.robo.controller;


import com.robobg.robo.entity.Robot;
import com.robobg.robo.repository.service.RobotService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;


@org.springframework.stereotype.Controller
public class RobotController {
    private RobotService robotService;

    @Autowired
    public RobotController(RobotService robotService) {
        super();
        this.robotService = robotService;
    }

    @GetMapping("/compare") public String compare() {
        return "compare";
    }
    @GetMapping("/home") public String home() {
        return "home";
    }
    @GetMapping("/admin") public String adminPage(Model model) {
        model.addAttribute("robots",robotService.getAllRobots());
        return "admin";
    }
    @GetMapping("/admin/new")
    public String createStudentForm(Model model) {

        Robot robot = new Robot();
        model.addAttribute("robot", robot);
        return "create_robot";

    }
    @PostMapping("/admin")
    public String saveRobot(@ModelAttribute("robot") Robot robot) {
        robotService.saveRobot(robot);

        System.out.println();
        return "redirect:/admin";
    }







    @GetMapping("/robots")
    public String listRobots(Model model,@RequestParam(value="data", required=false) List<String> paramValues) {
        List<Robot> list = new ArrayList<>();
        Robot robot;
        for (String paramValue : paramValues) {
            robot = robotService.getRobotByModel(paramValue);
            list.add(robot);
        }
        model.addAttribute("robots",list);
        return "robots";
    }




    @GetMapping("/admin/{id}")
    public String deleteRobot(@PathVariable Long id) {
        robotService.deleteRobotById(id);
        return "redirect:/admin";
    }







}
