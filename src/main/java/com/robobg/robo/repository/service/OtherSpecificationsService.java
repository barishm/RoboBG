package com.robobg.robo.repository.service;

import com.robobg.robo.entity.OtherSpecifications;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public interface OtherSpecificationsService {
    List<OtherSpecifications> getAllOtherSpecifications();
}
