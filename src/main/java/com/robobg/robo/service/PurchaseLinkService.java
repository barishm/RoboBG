package com.robobg.robo.service;

import com.robobg.robo.entity.PurchaseLink;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public interface PurchaseLinkService {
    List<PurchaseLink> getAllPurchaseLinks();
}
