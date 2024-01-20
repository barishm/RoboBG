package com.robobg.service.impl;

import com.robobg.entity.PurchaseLink;
import com.robobg.entity.dtos.PurchaseLinkCreateDTO;
import com.robobg.entity.dtos.PurchaseLinkDTO;
import com.robobg.repository.PurchaseLinkRepository;
import com.robobg.service.PurchaseLinkService;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
@Service
public class PurchaseLinkServiceImpl implements PurchaseLinkService {
    private final PurchaseLinkRepository purchaseLinkRepository;
    @Autowired
    private ModelMapper modelMapper;

    public PurchaseLinkServiceImpl(PurchaseLinkRepository purchaseLinkRepository) {
        this.purchaseLinkRepository = purchaseLinkRepository;
    }

    @Override
    public List<PurchaseLinkDTO> findPurchaseLinksByRobotId(Long robotId) {
        List<PurchaseLink> purchaseLinks = purchaseLinkRepository.findByRobotId(robotId);

        List<PurchaseLinkDTO> purchaseLinkDTOList = new ArrayList<>();

        for (PurchaseLink purchaseLink : purchaseLinks) {
            PurchaseLinkDTO purchaseLinkDTO = modelMapper.map(purchaseLink,PurchaseLinkDTO.class);
            purchaseLinkDTOList.add(purchaseLinkDTO);
        }
        return purchaseLinkDTOList;
    }

    @Override
    public void createPurchaseLink(PurchaseLinkCreateDTO purchaseLinkCreateDTO) {
        PurchaseLink purchaseLink = modelMapper.map(purchaseLinkCreateDTO,PurchaseLink.class);
        purchaseLinkRepository.save(purchaseLink);
    }

    @Override
    public void deletePurchaseLink(Long id) {
        purchaseLinkRepository.deleteById(id);
    }
}
