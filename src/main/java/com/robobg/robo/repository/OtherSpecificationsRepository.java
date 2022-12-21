package com.robobg.robo.repository;

import com.robobg.robo.entity.OtherSpecifications;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface OtherSpecificationsRepository extends JpaRepository<OtherSpecifications,Long> {
}
