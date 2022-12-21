package com.robobg.robo.service.impl;

import com.robobg.robo.entity.Sensor;
import com.robobg.robo.repository.SensorRepository;
import com.robobg.robo.service.SensorService;
import org.springframework.beans.factory.annotation.Autowired;

import java.util.List;

public class SensorServiceImpl implements SensorService {
    private SensorRepository sensorRepository;

    @Autowired
    public SensorServiceImpl(SensorRepository sensorRepository) {
        this.sensorRepository = sensorRepository;
    }

    @Override
    public List<Sensor> getAllSensors() {
        return sensorRepository.findAll();
    }
}
