package com.robobg.robo.controller;

import org.springframework.web.bind.annotation.GetMapping;

@org.springframework.stereotype.Controller
public class HomeController {


    @GetMapping("/home")
    public String home() {
        return "home";
    }

}
