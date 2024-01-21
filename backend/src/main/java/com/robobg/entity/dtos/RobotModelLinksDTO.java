package com.robobg.entity.dtos;

import com.robobg.entity.dtos.RobotDTO.PurchaseLinkDTO;
import lombok.Data;

import java.util.List;
@Data
public class RobotModelLinksDTO {
    private Long id;
    private String model;
    private List<PurchaseLinkDTO> purchaseLinks;
}
