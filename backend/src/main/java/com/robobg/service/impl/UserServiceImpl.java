package com.robobg.service.impl;

import com.robobg.entity.Role;
import com.robobg.entity.User;
import com.robobg.entity.dtos.UserIdUsernameRoleDTO;
import com.robobg.repository.UserRepository;
import com.robobg.service.UserService;
import jakarta.persistence.EntityNotFoundException;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
public class UserServiceImpl implements UserService {
    private final UserRepository userRepository;
    @Autowired
    private ModelMapper modelMapper;

    public UserServiceImpl(UserRepository userRepository) {
        this.userRepository = userRepository;

    }

    @Override
    public void setRole(UserIdUsernameRoleDTO userIdUsernameRoleDTO) {
        Optional<User> userOptional = userRepository.findById(userIdUsernameRoleDTO.getId());

        if (userOptional.isPresent()) {
            User user = userOptional.get();
            user.setRole(Role.valueOf(userIdUsernameRoleDTO.getRole()));
            userRepository.save(user);
        } else {
            throw new EntityNotFoundException("User not found with ID: " + userIdUsernameRoleDTO.getId());
        }
    }

    @Override
    public List<UserIdUsernameRoleDTO> getAll() {
        List<User> users = userRepository.findAll();

        List<UserIdUsernameRoleDTO> userDTOs = new ArrayList<>();

        for (User user : users) {
            UserIdUsernameRoleDTO userDTO = modelMapper.map(user, UserIdUsernameRoleDTO.class);
            userDTOs.add(userDTO);
        }

        return userDTOs;
    }
}
