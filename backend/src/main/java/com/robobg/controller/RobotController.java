package com.robobg.controller;

import com.robobg.entity.dtos.PurchaseLinkDTO;
import com.robobg.entity.dtos.QuestionWithAnswersDTO;
import com.robobg.entity.dtos.RobotDTO.RobotDTO;
import com.robobg.service.PurchaseLinkService;
import com.robobg.service.QuestionService;
import com.robobg.service.RobotService;
import org.springframework.web.bind.annotation.*;
import java.util.Arrays;
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
        if(fields != null){
            if(fields.containsAll(Arrays.asList("model", "links"))){
                return robotService.getAllModelsLinksById(id);
            }
        }
        return robotService.getRobotById(id);
    }

    @GetMapping
    public List<?> getRobots(@RequestParam(required = false) HashSet<String> fields,
                             @RequestParam(required = false) List<Long> id
    ) {
        if(fields == null && id == null){
            return robotService.getAllRobots();
        }
        else if (id != null && !id.isEmpty()) {
            return robotService.findByIdIn(id);
        } else if (fields != null) {
            if (fields.containsAll(Arrays.asList("model", "image", "links", "bests"))) {
                return robotService.findAllBests();
            } else if (fields.containsAll(Arrays.asList("model", "image", "links"))) {
                return robotService.getAllRobotIdModelImageLinks();
            } else if (fields.containsAll(Arrays.asList("model", "image"))) {
                return robotService.getAllRobotIdModelImage();
            } else if (fields.contains("model")) {
                return robotService.getAllModels();
            }
        }
        return null;
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
