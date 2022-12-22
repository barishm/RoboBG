package com.robobg.robo.repository.service.impl;

import com.robobg.robo.entity.OtherSpecifications;
import com.robobg.robo.repository.OtherSpecificationsRepository;
import com.robobg.robo.repository.service.OtherSpecificationsService;
import org.springframework.beans.factory.annotation.Autowired;

import java.util.List;

public class OtherSpecificationsServiceImpl implements OtherSpecificationsService {
    private OtherSpecificationsRepository otherSpecificationsRepository;

    @Autowired
    public OtherSpecificationsServiceImpl(OtherSpecificationsRepository otherSpecificationsRepository) {
        this.otherSpecificationsRepository = otherSpecificationsRepository;
    }

    @Override
    public List<OtherSpecifications> getAllOtherSpecifications() {
        return otherSpecificationsRepository.findAll();
    }
}
