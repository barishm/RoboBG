package com.robobg.robo.repository.service;

import com.robobg.robo.entity.Battery;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public interface BatteryService {
    List<Battery> getAllBatteries();
}
