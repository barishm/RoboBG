package com.robobg.robo.repository.service;

import com.robobg.robo.entity.CleaningFeatures;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public interface CleaningFeaturesService {
    List<CleaningFeatures> getAllCleaningFeatures();
}
