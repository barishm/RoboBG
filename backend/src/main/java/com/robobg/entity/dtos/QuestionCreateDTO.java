package com.robobg.entity.dtos;

import lombok.Data;

@Data
public class QuestionCreateDTO {
    private Long id;
    private Long robotId;
    private String authorUsername;
    private String text;
}
