package com.robobg.entity.dtos;

import lombok.Data;

@Data
public class PurchaseLinkCreateDTO {
    private Long id;
    private Long robotId;
    private String name;
    private String link;
}
