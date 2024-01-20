package com.robobg.service;

import com.robobg.entity.dtos.PurchaseLinkCreateDTO;
import com.robobg.entity.dtos.PurchaseLinkDTO;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public interface PurchaseLinkService {
    List<PurchaseLinkDTO> findPurchaseLinksByRobotId(Long robotId);

    void createPurchaseLink(PurchaseLinkCreateDTO purchaseLinkCreateDTO);

    void deletePurchaseLink(Long id);
}
