package com.robobg.config;


import com.fasterxml.jackson.databind.ObjectMapper;
import com.robobg.entity.Robot;
import com.robobg.entity.Role;
import com.robobg.entity.User;
import com.robobg.repository.RobotRepository;
import com.robobg.repository.UserRepository;
import org.springframework.boot.CommandLineRunner;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;

import java.io.InputStream;
import java.util.Arrays;
import java.util.List;
import java.util.stream.Collectors;

@Component
public class DatabaseSeeder implements CommandLineRunner {
    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final ObjectMapper objectMapper;
    private final RobotRepository robotRepository;


    public DatabaseSeeder(UserRepository userRepository, PasswordEncoder passwordEncoder, ObjectMapper objectMapper, RobotRepository robotRepository) {
        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
        this.objectMapper = objectMapper;
        this.robotRepository = robotRepository;
    }

    @Override
    public void run(String... args) throws Exception {
        if(userRepository.findByUsername("admin").isEmpty()) {
            User user = new User();
            user.setUsername("admin");
            user.setPassword(passwordEncoder.encode("123456"));
            user.setRole(Role.ADMIN);
            userRepository.save(user);
        }
        InputStream inputStreamOfUsers = getClass().getResourceAsStream("/users.json");
        User[] data2 = objectMapper.readValue(inputStreamOfUsers,User[].class);
        List<User> usersToSave = Arrays.stream(data2)
                .filter(user -> !userRepository.existsByUsername(user.getUsername()))
                .peek(user -> {
                    user.setPassword(passwordEncoder.encode(user.getPassword())); // Encoding password here
                })
                .collect(Collectors.toList());
        if(!usersToSave.isEmpty()){
            userRepository.saveAll(usersToSave);
        }

        InputStream inputStream = getClass().getResourceAsStream("/robots.json");
        Robot[] data = objectMapper.readValue(inputStream, Robot[].class);

        List<Robot> robotsToSave = Arrays.stream(data)
                .filter(robot -> !robotRepository.existsByModel(robot.getModel()))
                .collect(Collectors.toList());

        if (!robotsToSave.isEmpty()) {
            robotRepository.saveAll(robotsToSave);
        }
    }
}
