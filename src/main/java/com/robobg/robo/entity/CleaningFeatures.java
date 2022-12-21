package com.robobg.robo.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.beans.ConstructorProperties;

@Entity
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Table(name = "cleaning_features")
public class CleaningFeatures {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "suction_power")
    private String suctionPower;

    @Column(name = "cleaning_area")
    private String cleaningArea;

    @Column(name = "dustbin_capacity")
    private String dustbinCapacity;

    @Column(name = "disposable_dust_bag_capacity")
    private String disposableDustBagCapacity;

    @Column(name = "auto_dirt_disposal")
    private String autoDirtDisposal;

    @Column(name = "barrier_cross_height")
    private String barrierCrossHeight;

    @Column(name = "hepa_filter")
    private String hepaFilter;

    @Column(name = "washable_filter")
    private String washableFilter;

}
