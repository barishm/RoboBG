package com.robobg.robo.service;

import com.robobg.robo.entity.MoppingFeatures;
import org.springframework.stereotype.Service;

import java.util.List;
@Service
public interface MoppingFeaturesService {
    List<MoppingFeatures> getAllMoppingFeatures();
}
