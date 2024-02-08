package com.robobg.entity.dtos;

import lombok.Data;

@Data
public class UpdateMostComparedDTO {
    private Long id;
    private Integer order;
    private int robot1;
    private int robot2;
    private int robot3;
}
