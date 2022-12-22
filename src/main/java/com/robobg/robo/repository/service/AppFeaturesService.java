package com.robobg.robo.repository.service;

import com.robobg.robo.entity.AppFeatures;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public interface AppFeaturesService {
    List<AppFeatures> getAllAppFeatures();
}
