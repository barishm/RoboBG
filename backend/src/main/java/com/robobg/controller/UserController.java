package com.robobg.controller;

import com.robobg.config.JwtService;
import com.robobg.entity.Answer;
import com.robobg.entity.Question;
import com.robobg.entity.dtos.AnswerCreateDTO;
import com.robobg.entity.dtos.QuestionCreateDTO;
import com.robobg.exceptions.EntityNotFoundException;
import com.robobg.service.AnswerService;
import com.robobg.service.QuestionService;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import jakarta.validation.Valid;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;


@RestController
@CrossOrigin(origins = "https://robot-review.netlify.app/")
@RequestMapping("/v1/user")
public class UserController {
    private final QuestionService questionService;
    private final AnswerService answerService;

    private final JwtService jwtService;

    public UserController(QuestionService questionService, AnswerService answerService, JwtService jwtService) {
        this.questionService = questionService;
        this.answerService = answerService;
        this.jwtService = jwtService;
    }

    @PostMapping("/answers")
    public ResponseEntity<String> createAnswer(@Valid @RequestBody AnswerCreateDTO answerCreateDTO, HttpServletRequest request) throws EntityNotFoundException {
        String token = extractJwtFromRequest(request);
        String tokenUsername = jwtService.extractUsername(token);
        String requestUsername = answerCreateDTO.getAuthorUsername();
        if (!tokenUsername.equals(requestUsername)) {
            return ResponseEntity.status(HttpServletResponse.SC_FORBIDDEN).body("Invalid user");
        }
        answerService.createAnswer(answerCreateDTO);
        return ResponseEntity.ok().build();
    }

    @DeleteMapping("/answers/{id}")
    public ResponseEntity<String> deleteAnswer(@PathVariable Long id, HttpServletRequest request) throws EntityNotFoundException {
        String token = extractJwtFromRequest(request);
        String tokenUsername = jwtService.extractUsername(token);
        Answer answer = answerService.findById(id);
        String authorUsername = answer.getAuthor().getUsername();
        String tokenRole = jwtService.extractRole(token);
        if("ADMIN".equals(tokenRole)){
            answerService.deleteAnswer(id);
            return ResponseEntity.ok().build();
        } else if (tokenUsername.equals(authorUsername)) {
            answerService.deleteAnswer(id);
            return ResponseEntity.ok().build();
        } else {
            return ResponseEntity.status(HttpServletResponse.SC_FORBIDDEN).body("Invalid user");
        }
    }
    @DeleteMapping("/questions/{id}")
    public ResponseEntity<String> deleteQuestion(@PathVariable Long id, HttpServletRequest request) throws EntityNotFoundException {
        String token = extractJwtFromRequest(request);
        String tokenUsername = jwtService.extractUsername(token);
        String tokenRole = jwtService.extractRole(token);
        Question question = questionService.findById(id);
        String authorUsername = question.getAuthor().getUsername();
        if("ADMIN".equals(tokenRole)){
            questionService.deleteQuestion(id);
            return ResponseEntity.ok().build();
        } else if (tokenUsername.equals(authorUsername)) {
            questionService.deleteQuestion(id);
            return ResponseEntity.ok().build();
        } else {
            return ResponseEntity.status(HttpServletResponse.SC_FORBIDDEN).body("Invalid user");
        }
    }

    @PostMapping("/questions")
    public ResponseEntity<String> createQuestion(@Valid @RequestBody QuestionCreateDTO questionCreateDTO, HttpServletRequest request) throws EntityNotFoundException {
        String token = extractJwtFromRequest(request);
        String tokenUsername = jwtService.extractUsername(token);
        String requestUsername = questionCreateDTO.getAuthorUsername();
        if (!tokenUsername.equals(requestUsername)) {
            return ResponseEntity.status(HttpServletResponse.SC_FORBIDDEN).body("Invalid user");
        }
        questionService.createQuestion(questionCreateDTO);
        return ResponseEntity.ok().build();
    }

    private String extractJwtFromRequest(HttpServletRequest request) {
        String bearerToken = request.getHeader("Authorization");
        if (bearerToken != null && bearerToken.startsWith("Bearer ")) {
            return bearerToken.substring(7);
        }
        return null;
    }
}
