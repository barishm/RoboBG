package com.robobg.robo.repository;

import com.robobg.robo.entity.Control;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ControlRepository extends JpaRepository<Control,Long> {
}
