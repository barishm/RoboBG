package com.robobg.service.impl;

import com.robobg.entity.Robot;
import com.robobg.entity.dtos.*;
import com.robobg.entity.dtos.RobotDTO.CreateRobotDTO;
import com.robobg.entity.dtos.RobotDTO.RobotDTO;
import com.robobg.entity.dtos.RobotDTO.RobotResponse;
import com.robobg.exceptions.RobotAlreadyExistsException;
import com.robobg.repository.RobotRepository;
import com.robobg.service.RobotService;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.crossstore.ChangeSetPersister.NotFoundException;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.*;
import java.util.stream.Collectors;

@Service
public class RobotServiceImpl implements RobotService {


    private final RobotRepository robotRepository;
    private final S3Service s3Service;
    private final ModelMapper modelMapper;


    @Autowired
    public RobotServiceImpl(RobotRepository robotRepository, S3Service s3Service, ModelMapper modelMapper) {
        super();
        this.robotRepository = robotRepository;
        this.s3Service = s3Service;
        this.modelMapper = modelMapper;
    }

    @Override
    public List<RobotIdModelImageBestsDTO> findAllBests() {
        return robotRepository.findAllBests().stream()
                .filter(robot -> Boolean.TRUE.equals(robot.getBests()))
                .limit(8)
                .map(robot -> modelMapper.map(robot, RobotIdModelImageBestsDTO.class))
                .collect(Collectors.toList());
    }

    @Override
    public List<RobotDTO> getAllRobots() {
        return robotRepository.findAll().stream()
                .map(robot -> modelMapper.map(robot, RobotDTO.class))
                .collect(Collectors.toList());
    }

    @Override
    public RobotResponse getAllModels() {
        RobotResponse robotResponse = new RobotResponse();
        robotResponse.setContent(robotRepository.findAll().stream()
                .map(robot -> modelMapper.map(robot,RobotModelDTO.class))
                .collect(Collectors.toList()));
        return robotResponse;
    }

    @Override
    public Optional<RobotModelLinksDTO> getAllModelsLinksById(Long id) {
        Optional<Robot> robot = robotRepository.findById(id);
        if (robot.isPresent()) {
            RobotModelLinksDTO robotModelLinksDTO = modelMapper.map(robot.get(), RobotModelLinksDTO.class);
            return Optional.of(robotModelLinksDTO);
        }
        return Optional.empty();
    }


    public RobotResponse getAllRobotIdModelImage(int page, String model, List<String> brands) {
        Pageable pageable = PageRequest.of(page,12);
        Page<Robot> robots = robotRepository.findByModelContainsAndBrandIn(pageable,model,brands);
        List<Robot> listOfRobots = robots.getContent();
        List<RobotIdModelImageDTO> content = listOfRobots.stream().map(robot -> modelMapper.map(robot,RobotIdModelImageDTO.class)).collect(Collectors.toList());
        RobotResponse robotResponse = new RobotResponse();
        robotResponse.setContent(content);
        robotResponse.setPageNo(robots.getNumber());
        robotResponse.setTotalPages(robots.getTotalPages());
        robotResponse.setLast(robots.isLast());
        return robotResponse;
    }

    @Override
    public RobotResponse getAllRobotIdModelImageLinks(int page, String model, List<String> brands) {
        Pageable pageable = PageRequest.of(page,12);
        Page<Robot> robots = robotRepository.findByModelContainsAndBrandIn(pageable,model,brands);
        List<Robot> listOfRobots = robots.getContent();
        List<RobotIdModelImageLinksDTO> content = listOfRobots.stream().map(robot -> modelMapper.map(robot,RobotIdModelImageLinksDTO.class)).collect(Collectors.toList());
        RobotResponse robotResponse = new RobotResponse();
        robotResponse.setContent(content);
        robotResponse.setPageNo(robots.getNumber());
        robotResponse.setTotalPages(robots.getTotalPages());
        robotResponse.setLast(robots.isLast());
        return robotResponse;
    }

    @Override
    public void saveRobot(CreateRobotDTO createRobotDTO) throws RobotAlreadyExistsException {
        if (robotRepository.existsByModel(createRobotDTO.getModel())) {
            throw new RobotAlreadyExistsException("Robot already exists");
        }
        Robot robot = modelMapper.map(createRobotDTO, Robot.class);
        robotRepository.save(robot);
    }

    @Override
    public void updateRobot(CreateRobotDTO createRobotDTO) {
        Robot robot = modelMapper.map(createRobotDTO, Robot.class);
        String image = robotRepository.findImageById(createRobotDTO.getId());
        robot.setImage(image);
        robotRepository.save(robot);
    }

    @Override
    public void deleteRobotById(Long id) throws NotFoundException {
        Optional<Robot> optionalRobot = robotRepository.findById(id);
        if (optionalRobot.isPresent()) {
            Robot robot = optionalRobot.get();
            String imageUrl = robot.getImage();
            if(imageUrl != null) {
                String fileName = imageUrl.substring(64);
                s3Service.deleteObjectFromBucket("robot-review-robot-images",fileName);
            }
            robotRepository.deleteById(id);
        } else {
            throw new NotFoundException();
        }
    }

    @Override
    public void uploadRobotImage(Long robotId, MultipartFile file) throws IOException {
        Optional<Robot> robotOptional = robotRepository.findById(robotId);
        if (robotOptional.isEmpty()) {
            throw new IllegalArgumentException("Robot with ID " + robotId + " does not exist.");
        }

        String extension = getExtensionOfFile(file);
        String contentType = determineContentType(extension);
        String objectKey = "Robot%s.%s".formatted(robotId, extension);

        if (contentType.isEmpty()) {
            throw new IllegalArgumentException("Unsupported file type.");
        }

        s3Service.putObject(
                "robot-review-robot-images",
                objectKey,
                file.getBytes(),
                contentType
        );
        Robot robot = robotOptional.get();
        robot.setImage("https://robot-review-robot-images.s3.eu-central-1.amazonaws.com/" + objectKey);
        robotRepository.save(robot);
    }

    private String getExtensionOfFile(MultipartFile file) {
        String fileName = file.getOriginalFilename();
        if (fileName == null || !fileName.contains(".")) {
            return "";
        }
        return fileName.substring(fileName.lastIndexOf(".") + 1);
    }
    private String determineContentType(String extension) {
        return switch (extension.toLowerCase()) {
            case "png" -> "image/png";
            case "jpg" -> "image/jpg";
            case "jpeg" -> "image/jpeg";
            default -> ""; // Unsupported type
        };
    }

    @Override
    public RobotResponse getRobots(HashSet<String> fields, int page, String model, List<String> brands) {
        if(brands.isEmpty()){
            brands.addAll(List.of("360","SAMSUNG","Roborock","Xiaomi","Eufy"));
        }
        if (fields.containsAll(Arrays.asList("model", "image", "links"))) {
            return getAllRobotIdModelImageLinks(page,model,brands);
        } else if (fields.containsAll(Arrays.asList("model", "image"))) {
            return getAllRobotIdModelImage(page,model,brands);
        } else if (fields.contains("model")) {
            return getAllModels();
        }
        return null;
    }
    @Override
    public Optional<?> getRobotById(Long id,HashSet<String> fields) {
        if(fields == null){
            Optional<Robot> robot = robotRepository.findById(id);
            if (robot.isPresent()) {
                RobotDTO robotDTO = modelMapper.map(robot.get(), RobotDTO.class);
                return Optional.of(robotDTO);
            }
        } else {
            if(fields.containsAll(Arrays.asList("model", "links"))){
                return getAllModelsLinksById(id);
            }
        }
        return Optional.empty();
    }
}
