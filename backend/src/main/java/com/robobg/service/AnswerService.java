package com.robobg.service;

import com.robobg.entity.Answer;
import com.robobg.entity.dtos.AnswerCreateDTO;
import com.robobg.exceptions.EntityNotFoundException;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public interface AnswerService {

    void createAnswer(AnswerCreateDTO answerCreateDTO) throws EntityNotFoundException;

    void deleteAnswer(Long answerId);

    Answer findById(Long id) throws EntityNotFoundException;

}
