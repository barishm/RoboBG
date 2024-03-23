package com.robobg.controller;

import com.robobg.entity.dtos.UserIdUsernameRoleDTO;
import com.robobg.service.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;



@RestController
@CrossOrigin(origins = "https://robobg.netlify.app/")
@RequestMapping("/v1/admin")
public class AdminController {
    private final UserService userService;
    @Autowired
    public AdminController(UserService userService) {
        this.userService = userService;
    }


    @PutMapping("/users")
    public void setRole(@RequestBody UserIdUsernameRoleDTO userIdUsernameRoleDTO) {
        userService.setRole(userIdUsernameRoleDTO);
    }


}
