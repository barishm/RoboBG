package com.robobg.robo.service.impl;

import com.robobg.robo.entity.AppFeatures;
import com.robobg.robo.repository.AppFeaturesRepository;
import com.robobg.robo.service.AppFeaturesService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class AppFeaturesServiceImpl implements AppFeaturesService {
    private AppFeaturesRepository appFeaturesRepository;

    @Autowired
    public AppFeaturesServiceImpl(AppFeaturesRepository appFeaturesRepository) {
        super();
        this.appFeaturesRepository = appFeaturesRepository;
    }

    @Override
    public List<AppFeatures> getAllAppFeatures() {
        return appFeaturesRepository.findAll();
    }
}
