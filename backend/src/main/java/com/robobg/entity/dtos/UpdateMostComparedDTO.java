package com.robobg.entity.dtos;

import lombok.Data;

@Data
public class UpdateMostComparedDTO {
    private Long id;
    private Integer order;
    private String robot1;
    private String robot2;
    private String robot3;
}
