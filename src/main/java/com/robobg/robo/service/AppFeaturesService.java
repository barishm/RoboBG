package com.robobg.robo.service;

import com.robobg.robo.entity.AppFeatures;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public interface AppFeaturesService {
    List<AppFeatures> getAllAppFeatures();
}
