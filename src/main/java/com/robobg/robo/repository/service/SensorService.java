package com.robobg.robo.repository.service;

import com.robobg.robo.entity.Sensor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public interface SensorService {
    List<Sensor> getAllSensors();
}
