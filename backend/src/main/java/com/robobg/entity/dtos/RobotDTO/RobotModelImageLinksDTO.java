package com.robobg.entity.dtos.RobotDTO;

import com.robobg.entity.dtos.RobotDTO.PurchaseLinkDTO;
import lombok.Data;

import java.util.List;

@Data
public class RobotModelImageLinksDTO {
    private Long id;
    private String model;
    private String image;
    private List<PurchaseLinkDTO> purchaseLinks;
}

