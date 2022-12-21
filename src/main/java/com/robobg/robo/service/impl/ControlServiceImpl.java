package com.robobg.robo.service.impl;

import com.robobg.robo.entity.Control;
import com.robobg.robo.repository.ControlRepository;
import com.robobg.robo.service.ControlService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ControlServiceImpl implements ControlService {
    private ControlRepository controlRepository;

    @Autowired
    public ControlServiceImpl(ControlRepository controlRepository) {
        this.controlRepository = controlRepository;
    }

    @Override
    public List<Control> getAllControls() {
        return controlRepository.findAll();
    }
}
