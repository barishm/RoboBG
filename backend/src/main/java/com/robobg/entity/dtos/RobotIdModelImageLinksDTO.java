package com.robobg.entity.dtos;

import com.robobg.entity.dtos.RobotDTO.PurchaseLinkDTO;
import lombok.Data;

import java.util.List;

@Data
public class RobotIdModelImageLinksDTO {
    private Long id;
    private String model;
    private String image;
    private Integer bests;
    private List<PurchaseLinkDTO> purchaseLinks;
}

