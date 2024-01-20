package com.robobg.entity.dtos;

import lombok.Data;

@Data
public class AnswerCreateDTO {
    private Long id;
    private Long questionId;
    private String authorUsername;
    private String text;
}
