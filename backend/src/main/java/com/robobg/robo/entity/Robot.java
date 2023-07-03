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
@Table(name = "robots")
public class Robot {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "model",unique = true,nullable = false)
    private String model;

    @Column
    private String mapping;

    @Column(name = "mapping_sensor_type")
    private String mappingSensorType;

    @Column(name = "high_precision_map")
    private String highPrecisionMap;

    @Column(name = "front_camera")
    private String frontCamera;

    @Column(name = "recharge_resume")
    private String rechargeResume;

    @Column(name = "auto_dock_and_recharge")
    private String autoDockAndRecharge;

    @Column(name = "noise_level")
    private String noiseLevel;

    @Column
    private String display;

    @Column(name = "side_brushes")
    private String sideBrushes;

    @Column(name = "voice_prompts")
    private String voicePrompts;

    @OneToOne(cascade = CascadeType.REMOVE)
    @JoinColumn(name = "cleaning_features_id",referencedColumnName = "id")
    private CleaningFeatures cleaningFeatures;

    @OneToOne(cascade = CascadeType.REMOVE)
    @JoinColumn(name = "mopping_features_id",referencedColumnName = "id")
    private MoppingFeatures moppingFeatures;

    @OneToOne(cascade = CascadeType.REMOVE)
    @JoinColumn(name = "batteries_id",referencedColumnName = "id")
    private Battery battery;

    @OneToOne(cascade = CascadeType.REMOVE)
    @JoinColumn(name = "controls_id",referencedColumnName = "id")
    private Control control;

    @OneToOne(cascade = CascadeType.REMOVE)
    @JoinColumn(name = "app_features_id",referencedColumnName = "id")
    private AppFeatures appFeatures;

    @OneToOne(cascade = CascadeType.REMOVE)
    @JoinColumn(name = "sensors_id",referencedColumnName = "id")
    private Sensor sensor;

    @OneToOne(cascade = CascadeType.REMOVE)
    @JoinColumn(name = "other_specifications_id",referencedColumnName = "id")
    private OtherSpecifications otherSpecifications;

    @OneToOne(cascade = CascadeType.REMOVE)
    @JoinColumn(name = "purchase_links",referencedColumnName = "id")
    private PurchaseLink purchaseLink;


}
