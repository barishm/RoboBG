package com.robobg.entity.dtos;

import com.robobg.entity.dtos.RobotDTO.PurchaseLinkDTO;
import lombok.Data;

import java.util.List;

@Data
public class RobotIdModelImageBestsDTO {
    private Long id;
    private String model;
    private String image;
    private Boolean bests;
    private List<PurchaseLinkDTO> purchaseLinks;
}
