package com.robobg.robo.controller;

import org.springframework.web.bind.annotation.GetMapping;

@org.springframework.stereotype.Controller
public class CompareController {


    @GetMapping("/compare")
    public String compare() {
        return "compare";
    }



}
