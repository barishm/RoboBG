package com.robobg.robo.service;

import com.robobg.robo.entity.Sensor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public interface SensorService {
    List<Sensor> getAllSensors();
}
