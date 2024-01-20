package com.robobg.service.impl;

import com.robobg.entity.Answer;
import com.robobg.entity.Question;
import com.robobg.entity.User;
import com.robobg.entity.dtos.AnswerDTO;
import com.robobg.entity.dtos.QuestionCreateDTO;
import com.robobg.entity.dtos.QuestionWithAnswersDTO;
import com.robobg.exceptions.EntityNotFoundException;
import com.robobg.repository.QuestionRepository;
import com.robobg.repository.UserRepository;
import com.robobg.service.QuestionService;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class QuestionServiceImpl implements QuestionService {
    private final QuestionRepository questionRepository;
    private final UserRepository userRepository;
    @Autowired
    private ModelMapper modelMapper;

    public QuestionServiceImpl(QuestionRepository questionRepository, UserRepository userRepository) {
        this.questionRepository = questionRepository;
        this.userRepository = userRepository;
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
    public void createQuestion(QuestionCreateDTO questionDTO) throws EntityNotFoundException {
        Question question = modelMapper.map(questionDTO, Question.class);
        question.setCreateTime(LocalDateTime.now());

        Optional<User> userOptional = userRepository.findByUsername(questionDTO.getAuthorUsername());


        if (userOptional.isPresent()) {
            User user = userOptional.get();
            question.setAuthor(user);
            questionRepository.save(question);
        } else {
            throw new EntityNotFoundException("User not found with username: " + questionDTO.getAuthorUsername());
        }

    }

    @Override
    public void deleteQuestion(Long questionId) {
        questionRepository.deleteById(questionId);
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
}
