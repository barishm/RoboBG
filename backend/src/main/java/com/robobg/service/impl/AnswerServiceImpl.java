package com.robobg.service.impl;

import com.robobg.entity.Answer;
import com.robobg.entity.Question;
import com.robobg.entity.User;
import com.robobg.entity.dtos.AnswerCreateDTO;
import com.robobg.exceptions.EntityNotFoundException;
import com.robobg.repository.AnswerRepository;
import com.robobg.repository.UserRepository;
import com.robobg.service.AnswerService;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

@Service
public class AnswerServiceImpl implements AnswerService {
    private final AnswerRepository answerRepository;
    private final UserRepository userRepository;
    @Autowired
    private ModelMapper modelMapper;

    public AnswerServiceImpl(AnswerRepository answerRepository, UserRepository userRepository) {
        this.answerRepository = answerRepository;
        this.userRepository = userRepository;
    }





    @Override
    public void createAnswer(AnswerCreateDTO answerCreateDTO) throws EntityNotFoundException {
        Answer answer = modelMapper.map(answerCreateDTO, Answer.class);
        answer.setCreateTime(LocalDateTime.now());
        Optional<User> userOptional = userRepository.findByUsername(answerCreateDTO.getAuthorUsername());

        if (userOptional.isPresent()) {
            User user = userOptional.get();
            answer.setAuthor(user);
            answerRepository.save(answer);
        } else {
            throw new EntityNotFoundException("User not found with username: " + answerCreateDTO.getAuthorUsername());
        }

    }

    @Override
    public void deleteAnswer(Long answerId) {
        answerRepository.deleteById(answerId);
    }

    @Override
    public Answer findById(Long id) throws EntityNotFoundException {
        Optional<Answer> result = answerRepository.findById(id);
        if (result.isPresent()) {
            return result.get();
        } else {
            throw new EntityNotFoundException("Question not found with id: " + id);
        }
    }
}
