package com.robobg.service;

import com.robobg.entity.Robot;
import com.robobg.entity.dtos.*;
import com.robobg.entity.dtos.RobotDTO.CreateRobotDTO;
import com.robobg.entity.dtos.RobotDTO.RobotDTO;
import com.robobg.exceptions.RobotAlreadyExistsException;
import org.springframework.data.crossstore.ChangeSetPersister;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public interface RobotService {
    List<RobotIdModelImageDTO> getAllRobotIdModelImage();
    List<RobotIdModelImageLinksDTO> getAllRobotIdModelImageLinks();
    void saveRobot(CreateRobotDTO robot) throws RobotAlreadyExistsException;
    void updateRobot(CreateRobotDTO robot);
    Optional<RobotDTO> getRobotById(Long id);
    void deleteRobotById(Long id) throws ChangeSetPersister.NotFoundException;
    List<RobotDTO> findByIdIn(List<Long> ids);
    List<RobotIdModelImageBestsDTO> findAllBests();

    List<RobotDTO> getAllRobots();

    List<RobotModelDTO> getAllModels();

    Optional<RobotModelLinksDTO> getAllModelsLinksById(Long id);


}
