package com.robobg.robo.repository.service;

import com.robobg.robo.entity.PurchaseLink;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public interface PurchaseLinkService {
    List<PurchaseLink> getAllPurchaseLinks();
}
