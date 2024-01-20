package com.robobg.service;

import com.robobg.entity.Question;
import com.robobg.entity.dtos.QuestionCreateDTO;
import com.robobg.entity.dtos.QuestionWithAnswersDTO;
import com.robobg.exceptions.EntityNotFoundException;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public interface QuestionService {
    List<QuestionWithAnswersDTO> findQuestionsByRobotId(Long robotId);
    void createQuestion(QuestionCreateDTO questionDTO) throws EntityNotFoundException;
    void deleteQuestion(Long questionId);
    Question findById(Long id) throws EntityNotFoundException;
}
