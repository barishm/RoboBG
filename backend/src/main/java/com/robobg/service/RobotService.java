package com.robobg.service;

import com.robobg.entity.dtos.RobotDTO.CreateRobotDTO;
import com.robobg.entity.dtos.RobotDTO.RobotDTO;
import com.robobg.entity.dtos.RobotDTO.RobotModelImageLinksDTO;
import com.robobg.entity.dtos.RobotDTO.RobotResponse;
import com.robobg.exceptions.RobotAlreadyExistsException;
import org.springframework.data.crossstore.ChangeSetPersister;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.HashSet;
import java.util.List;
import java.util.Optional;

@Service
public interface RobotService {

    RobotResponse getAllRobotIdModelImageLinks(int page, String model, List<String> brands, Integer startYear, Integer endYear, Integer minDustbinCapacity, Integer maxDustbinCapacity, Integer minSuctionPower, Integer maxSuctionPower);

    void saveRobot(CreateRobotDTO robot) throws RobotAlreadyExistsException;
    void updateRobot(CreateRobotDTO robot);
    void deleteRobotById(Long id) throws ChangeSetPersister.NotFoundException;
    List<RobotModelImageLinksDTO> findAllBests();

    RobotResponse getAllModels();


    Optional<RobotDTO> getRobotById(Long id);

    RobotResponse getRobots(HashSet<String> fields, int page, String model, List<String> brands,Integer startYear,Integer endYear,Integer minDustbinCapacity,Integer maxDustbinCapacity,Integer minSuctionPower,Integer maxSuctionPower);


    void uploadRobotImage(Long robotId, MultipartFile file) throws IOException;


}
