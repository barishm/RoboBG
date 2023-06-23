package com.robobg.robo.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Table(name = "mopping_features")
public class MoppingFeatures {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "wet_mopping")
    private String wetMopping;

    @Column(name = "electric_water_flow_control")
    private String electricWaterFlowControl;

    @Column(name = "water_tank_capacity")
    private String waterTankCapacity;

    @Column(name = "vibrating_mopping_pad")
    private String vibratingMoppingPad;

    @Column(name = "auto_mop_lifting")
    private String autoMopLifting;

    @Column(name = "auto_water_tank_refilling")
    private String autoWaterTankRefilling;

    @Column(name = "auto_mop_washing")
    private String autoMopWashing;
}
