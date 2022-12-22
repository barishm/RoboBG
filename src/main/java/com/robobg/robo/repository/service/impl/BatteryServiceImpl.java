package com.robobg.robo.repository.service.impl;

import com.robobg.robo.entity.Battery;
import com.robobg.robo.repository.BatteryRepository;
import com.robobg.robo.repository.service.BatteryService;
import org.springframework.beans.factory.annotation.Autowired;

import java.util.List;

public class BatteryServiceImpl implements BatteryService {
    private BatteryRepository batteryRepository;

    @Autowired
    public BatteryServiceImpl(BatteryRepository batteryRepository) {
        super();
        this.batteryRepository = batteryRepository;
    }

    @Override
    public List<Battery> getAllBatteries() {
        return batteryRepository.findAll();
    }
}
