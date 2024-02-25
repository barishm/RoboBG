package com.robobg.controller;

import com.robobg.entity.dtos.PurchaseLinkDTO;
import com.robobg.entity.dtos.QuestionWithAnswersDTO;
import com.robobg.service.PurchaseLinkService;
import com.robobg.service.QuestionService;
import com.robobg.service.RobotService;
import org.springframework.web.bind.annotation.*;
import java.util.HashSet;
import java.util.List;
import java.util.Optional;

@RestController
@CrossOrigin
@RequestMapping("/v1/robots")
public class RobotController {
    private final RobotService robotService;
    private final PurchaseLinkService purchaseLinkService;
    private final QuestionService questionService;

    public RobotController(RobotService robotService, PurchaseLinkService purchaseLinkService, QuestionService questionService) {
        this.robotService = robotService;
        this.purchaseLinkService = purchaseLinkService;
        this.questionService = questionService;
    }

    @GetMapping("/{id}")
    public Optional<?> getRobotById(@PathVariable("id") Long id,
                                           @RequestParam(required = false) HashSet<String> fields) {
        return robotService.getRobotById(id,fields);
    }

    @GetMapping
    public List<?> getRobots(@RequestParam(required = false) HashSet<String> fields
    ) {
        return robotService.getRobots(fields);
    }

    @GetMapping("/{robotId}/purchase-links")
    public List<PurchaseLinkDTO> getAllLinksByRobotId(@PathVariable Long robotId){
        return purchaseLinkService.findPurchaseLinksByRobotId(robotId);
    }

    @GetMapping("/{robotId}/questions")
    public List<QuestionWithAnswersDTO> getAllQuestionsByRobotId(@PathVariable Long robotId) {
        return questionService.findQuestionsByRobotId(robotId).stream().toList();
    }


}
