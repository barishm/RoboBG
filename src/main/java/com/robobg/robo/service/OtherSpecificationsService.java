package com.robobg.robo.service;

import com.robobg.robo.entity.OtherSpecifications;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public interface OtherSpecificationsService {
    List<OtherSpecifications> getAllOtherSpecifications();
}
