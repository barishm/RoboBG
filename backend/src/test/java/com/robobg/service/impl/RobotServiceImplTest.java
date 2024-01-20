package com.robobg.service.impl;

import com.robobg.entity.Robot;
import com.robobg.entity.dtos.RobotDTO.RobotDTO;
import com.robobg.entity.dtos.RobotIdModelImageBestsDTO;
import com.robobg.entity.dtos.RobotIdModelImageDTO;
import com.robobg.entity.dtos.RobotIdModelImageLinksDTO;
import com.robobg.repository.RobotRepository;
import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.modelmapper.ModelMapper;

import java.util.ArrayList;
import java.util.List;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.*;

@ExtendWith(MockitoExtension.class)
class RobotServiceImplTest {
    private RobotServiceImpl robotService;

    @Mock
    private RobotRepository mockRobotRepository;

    private Robot robot1;
    private Robot robot2;
    private Robot robot3;


    @BeforeEach
    void setUp() {
        robotService = new RobotServiceImpl(
                mockRobotRepository, new ModelMapper()
        );
        robot1 = new Robot();
        robot1.setModel("model1");
        robot1.setBests(1);

        robot2 = new Robot();
        robot2.setModel("model2");
        robot2.setBests(2);

        robot3 = new Robot();
        robot3.setModel("model3");
    }



    @Test
    void findByIdIn() {
        List<Robot> list = new ArrayList<>();
        list.add(robot1);
        list.add(robot2);
        list.add(robot3);

        List<Long> ids = List.of(1L,2L,3L);
        when(mockRobotRepository.findByIdIn(ids)).thenReturn(list);

        List<RobotDTO> robotDTOList = robotService.findByIdIn(ids);

        assertNotNull(robotDTOList);
        assertEquals(3, robotDTOList.size());

        RobotDTO robotDTO1 = robotDTOList.get(0);
        RobotDTO robotDTO2 = robotDTOList.get(1);
        RobotDTO robotDTO3 = robotDTOList.get(2);


        assertEquals("model1", robotDTO1.getModel());
        assertEquals("model2", robotDTO2.getModel());
        assertEquals("model3", robotDTO3.getModel());

    }


    @Test
    void findAllBests() {
        List<Robot> list = new ArrayList<>();
        list.add(robot1);
        list.add(robot2);
        when(mockRobotRepository.findAllBests()).thenReturn(list);
        List<RobotIdModelImageBestsDTO> list2 = robotService.findAllBests();

        assertNotNull(list2);
        assertEquals(2, list2.size());

        RobotIdModelImageBestsDTO RobotIdModelImageBestsDTO1 = list2.get(0);
        RobotIdModelImageBestsDTO RobotIdModelImageBestsDTO2 = list2.get(1);

        assertEquals("model1", RobotIdModelImageBestsDTO1.getModel());
        assertEquals("model2", RobotIdModelImageBestsDTO2.getModel());
    }

    @Test
    void getAllRobotIdModelImage() {
        List<Robot> list = new ArrayList<>();
        list.add(robot1);
        list.add(robot2);
        list.add(robot3);
        when(mockRobotRepository.findAll()).thenReturn(list);
        List<RobotIdModelImageDTO> list2 = robotService.getAllRobotIdModelImage();

        assertNotNull(list2);
        assertEquals(3, list2.size());

        RobotIdModelImageDTO robotIdModelImageDTO1 = list2.get(0);
        RobotIdModelImageDTO robotIdModelImageDTO2 = list2.get(1);
        RobotIdModelImageDTO robotIdModelImageDTO3 = list2.get(2);

        assertEquals("model1",robotIdModelImageDTO1.getModel());
        assertEquals("model2",robotIdModelImageDTO2.getModel());
        assertEquals("model3",robotIdModelImageDTO3.getModel());

    }

    @Test
    void getAllRobotIdModelImageLinks() {
        List<Robot> list = new ArrayList<>();
        list.add(robot1);
        list.add(robot2);
        list.add(robot3);
        when(mockRobotRepository.findAll()).thenReturn(list);
        List<RobotIdModelImageLinksDTO> list2 = robotService.getAllRobotIdModelImageLinks();
        assertNotNull(list2);


    }
}