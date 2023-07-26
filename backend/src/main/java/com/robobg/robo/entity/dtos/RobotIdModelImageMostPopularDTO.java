package com.robobg.robo.entity.dtos;

import lombok.Data;

@Data
public class RobotIdModelImageMostPopularDTO {
    private Long id;
    private String model;
    private String image;
    private Integer mostPopular;

}
