package com.robobg.robo.repository.service;

import com.robobg.robo.entity.Control;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public interface ControlService {
    List<Control> getAllControls();
}
