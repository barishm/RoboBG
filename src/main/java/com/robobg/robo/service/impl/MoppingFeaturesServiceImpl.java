package com.robobg.robo.service.impl;

import com.robobg.robo.entity.MoppingFeatures;
import com.robobg.robo.repository.MoppingFeaturesRepository;
import com.robobg.robo.service.MoppingFeaturesService;
import org.springframework.beans.factory.annotation.Autowired;

import java.util.List;

public class MoppingFeaturesServiceImpl implements MoppingFeaturesService {
    private MoppingFeaturesRepository moppingFeaturesRepository;

    @Autowired
    public MoppingFeaturesServiceImpl(MoppingFeaturesRepository moppingFeaturesRepository) {
        this.moppingFeaturesRepository = moppingFeaturesRepository;
    }

    @Override
    public List<MoppingFeatures> getAllMoppingFeatures() {
        return moppingFeaturesRepository.findAll();
    }
}
