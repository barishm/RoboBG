package com.robobg.service.impl;

import com.robobg.config.JwtService;
import com.robobg.entity.Answer;
import com.robobg.entity.Question;
import com.robobg.entity.User;
import com.robobg.entity.dtos.AnswerDTO;
import com.robobg.entity.dtos.LatestQuestionsDTO;
import com.robobg.entity.dtos.QuestionCreateDTO;
import com.robobg.entity.dtos.QuestionWithAnswersDTO;
import com.robobg.exceptions.EntityNotFoundException;
import com.robobg.repository.QuestionRepository;
import com.robobg.repository.UserRepository;
import com.robobg.service.QuestionService;
import jakarta.servlet.http.HttpServletRequest;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.Comparator;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class QuestionServiceImpl implements QuestionService {
    private final QuestionRepository questionRepository;
    private final UserRepository userRepository;
    private final JwtService jwtService;
    @Autowired
    private ModelMapper modelMapper;

    public QuestionServiceImpl(QuestionRepository questionRepository, UserRepository userRepository, JwtService jwtService) {
        this.questionRepository = questionRepository;
        this.userRepository = userRepository;
        this.jwtService = jwtService;
    }



    @Override
    public List<QuestionWithAnswersDTO> findQuestionsByRobotId(Long robotId) {
        List<Question> questions = questionRepository.findByRobotId(robotId);

        List<QuestionWithAnswersDTO> questionDTOs = new ArrayList<>();

        for (Question question : questions) {
            QuestionWithAnswersDTO questionDTO = modelMapper.map(question, QuestionWithAnswersDTO.class);
            List<Answer> answers = question.getAnswers();
            List<AnswerDTO> answerDTOs = answers.stream()
                    .map(answer -> modelMapper.map(answer, AnswerDTO.class))
                    .collect(Collectors.toList());
            questionDTO.setAnswers(answerDTOs);
            questionDTOs.add(questionDTO);
        }

        return questionDTOs;
    }



    @Override
    public void createQuestion(QuestionCreateDTO questionCreateDTO, HttpServletRequest request) {
        String token = extractJwtFromRequest(request);
        String tokenUsername = jwtService.extractUsername(token);
        String requestUsername = questionCreateDTO.getAuthorUsername();
        if (!tokenUsername.equals(requestUsername)) {
            throw new IllegalArgumentException("Something went wrong!");
        }
        Question question = modelMapper.map(questionCreateDTO, Question.class);
        question.setCreateTime(LocalDateTime.now());
        Optional<User> userOptional = userRepository.findByUsername(questionCreateDTO.getAuthorUsername());
        if (userOptional.isPresent()) {
            User user = userOptional.get();
            question.setAuthor(user);
            questionRepository.save(question);
        } else {
            throw new IllegalArgumentException("Something went wrong!");
        }

    }

    @Override
    public void deleteQuestion(Long questionId, HttpServletRequest request) throws EntityNotFoundException {
        String token = extractJwtFromRequest(request);
        String tokenUsername = jwtService.extractUsername(token);
        String tokenRole = jwtService.extractRole(token);
        Question question = findById(questionId);
        String authorUsername = question.getAuthor().getUsername();
        if("ADMIN".equals(tokenRole)){
            questionRepository.deleteById(questionId);
        } else if (tokenUsername.equals(authorUsername)) {
            questionRepository.deleteById(questionId);
        } else {
            throw new IllegalArgumentException("Something went wrong!");
        }
    }


    @Override
    public Question findById(Long id) throws EntityNotFoundException {
        Optional<Question> result = questionRepository.findById(id);

        if (result.isPresent()) {
            return result.get();
        } else {
            throw new EntityNotFoundException("Question not found with id: " + id);
        }
    }

    @Override
    public List<LatestQuestionsDTO> getLatestQuestions() {
        LocalDateTime sevenDaysAgo = LocalDateTime.now().minusDays(7);
        List<Question> questionsLast7Days = questionRepository.findByCreateTimeAfter(sevenDaysAgo);
        questionsLast7Days.sort(Comparator.comparing(Question::getCreateTime).reversed());
        return questionsLast7Days.stream().map(question -> modelMapper.map(question, LatestQuestionsDTO.class)).collect(Collectors.toList());
    }

    private String extractJwtFromRequest(HttpServletRequest request) {
        String bearerToken = request.getHeader("Authorization");
        if (bearerToken != null && bearerToken.startsWith("Bearer ")) {
            return bearerToken.substring(7);
        }
        return null;
    }
}
