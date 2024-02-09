package com.robobg.entity.dtos;

import lombok.Data;

@Data
public class CreateMostComparedDTO {
    private Integer order;
    private String robot1;
    private String robot2;
    private String robot3;
}
