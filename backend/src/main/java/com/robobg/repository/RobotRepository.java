package com.robobg.repository;

import com.robobg.entity.Robot;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface RobotRepository extends JpaRepository<Robot,Long> {
    @Query("FROM Robot r WHERE r.bests IS NOT NULL")
    List<Robot> findAllBests();
    boolean existsByModel(String model);
    @Query("SELECT r.image FROM Robot r WHERE r.id = :id")
    String findImageById(@Param("id") Long id);
    @Query("SELECT r FROM Robot r WHERE r.model LIKE %:model% AND r.brand IN :brands ORDER BY CASE WHEN r.bests = TRUE THEN 0 ELSE 1 END, r.brand, r.model")
    Page<Robot> findByModelContainsAndBrandInAndOrderByBests(Pageable page, String model, List<String> brands);

    @Query("SELECT r FROM Robot r JOIN r.otherSpecifications os WHERE r.model LIKE %:model% AND r.brand IN :brands AND YEAR(os.releaseDate) BETWEEN :startYear AND :endYear ORDER BY CASE WHEN r.bests = TRUE THEN 0 ELSE 1 END, r.brand, r.model")
    Page<Robot> findByModelContainsAndBrandInAndReleaseYearBetweenAndOrderByBests(Pageable pageable, String model, List<String> brands, int startYear, int endYear);
    @Query("SELECT r.model FROM Robot r WHERE r.id = :id")
    String findModelById(Long id);

    @Query("SELECT r FROM Robot r WHERE r.model LIKE %:model% ORDER BY CASE WHEN r.bests = TRUE THEN 0 ELSE 1 END, r.brand, r.model")
    Page<Robot> findByModelContainsAndOrderByBests(Pageable page,String model);
}
