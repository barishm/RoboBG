package com.robobg.robo.repository;

import com.robobg.robo.entity.PurchaseLink;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface PurchaseLinkRepository extends JpaRepository<PurchaseLink,Long> {
}
