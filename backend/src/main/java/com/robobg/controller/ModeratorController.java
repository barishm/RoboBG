package com.robobg.controller;

import com.robobg.entity.dtos.CreateMostComparedDTO;
import com.robobg.entity.dtos.PurchaseLinkCreateDTO;
import com.robobg.entity.dtos.RobotDTO.CreateRobotDTO;
import com.robobg.entity.dtos.UpdateMostComparedDTO;
import com.robobg.entity.dtos.UserIdUsernameRoleDTO;
import com.robobg.exceptions.RobotAlreadyExistsException;
import com.robobg.service.MostComparedService;
import com.robobg.service.PurchaseLinkService;
import com.robobg.service.RobotService;
import com.robobg.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.crossstore.ChangeSetPersister;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@CrossOrigin(origins = "http://localhost:5173/")
@RequestMapping("/v1/moderator")
public class ModeratorController {
    private final RobotService robotService;
    private final UserService userService;
    private final PurchaseLinkService purchaseLinkService;
    private final MostComparedService mostComparedService;
    @Autowired
    public ModeratorController(RobotService robotService, UserService userService, PurchaseLinkService purchaseLinkService, MostComparedService mostComparedService) {
        this.robotService = robotService;
        this.userService = userService;
        this.purchaseLinkService = purchaseLinkService;
        this.mostComparedService = mostComparedService;
    }

    @DeleteMapping("/robots/{id}")
    public void deleteRobotById (@PathVariable("id") Long id) throws ChangeSetPersister.NotFoundException {
        robotService.deleteRobotById(id);
    }

    @PostMapping("/robots")
    public void createRobot (@RequestBody CreateRobotDTO createRobotDTO) throws RobotAlreadyExistsException {
        robotService.saveRobot(createRobotDTO);
    }

    @PutMapping("/robots")
    public void updateRobot(@RequestBody CreateRobotDTO robot) {
        robotService.updateRobot(robot);
    }


    @GetMapping("/users")
    public List<UserIdUsernameRoleDTO> getAllUsers() {
        return userService.getAll();
    }


    @PostMapping("/links")
    public void createPurchaseLink(@RequestBody PurchaseLinkCreateDTO purchaseLinkCreateDTO){
        purchaseLinkService.createPurchaseLink(purchaseLinkCreateDTO);
    }

    @DeleteMapping("/links/{id}")
    public void delete(@PathVariable Long id) {
        purchaseLinkService.deletePurchaseLink(id);
    }

    @PostMapping("/most-compares")
    public void createMostCompared(@RequestBody CreateMostComparedDTO createMostComparedDTO){
        mostComparedService.createMostCompared(createMostComparedDTO);
    }

    @PutMapping("/most-compares")
    public void updateMostCompared(@RequestBody UpdateMostComparedDTO updateMostComparedDTO){
        mostComparedService.updateMostCompared(updateMostComparedDTO);
    }

    @DeleteMapping("/most-compares/{id}")
    public void deleteMostCompared(@PathVariable Long id){
        mostComparedService.deleteMostCompared(id);
    }


}