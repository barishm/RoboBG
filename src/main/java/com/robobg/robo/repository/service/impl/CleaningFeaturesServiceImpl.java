package com.robobg.robo.repository.service.impl;

import com.robobg.robo.entity.CleaningFeatures;
import com.robobg.robo.repository.CleaningFeaturesRepository;
import com.robobg.robo.repository.service.CleaningFeaturesService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class CleaningFeaturesServiceImpl implements CleaningFeaturesService {
    private CleaningFeaturesRepository cleaningFeaturesRepository;

    @Autowired
    public CleaningFeaturesServiceImpl(CleaningFeaturesRepository cleaningFeaturesRepository) {
        super();
        this.cleaningFeaturesRepository = cleaningFeaturesRepository;
    }

    @Override
    public List<CleaningFeatures> getAllCleaningFeatures() {
        return cleaningFeaturesRepository.findAll();
    }
}
