package com.robobg.service;

import com.robobg.entity.dtos.CreateMostComparedDTO;
import com.robobg.entity.dtos.MostComparedDTO;
import com.robobg.entity.dtos.UpdateMostComparedDTO;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public interface MostComparedService {
    List<MostComparedDTO> getAll();

    void createMostCompared(CreateMostComparedDTO createMostComparedDTO);

    void updateMostCompared(UpdateMostComparedDTO updateMostComparedDTO);

    void deleteMostCompared(Long id);
}
