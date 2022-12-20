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
    private Boolean mapping;

    @Column(name = "mapping_sensor_type")
    private String mappingSensorType;

    @Column(name = "high_precision_map")
    private Boolean highPrecisionMap;

    @Column(name = "front_camera")
    private Boolean frontCamera;

    @Column(name = "recharge_resume")
    private Boolean rechargeResume;

    @Column(name = "auto_dock_and_recharge")
    private Boolean autoDockAndRecharge;

    @Column(name = "noise_level")
    private String noiseLevel;

    @Column
    private Boolean display;

    @Column(name = "side_brushes")
    private Integer sideBrushes;

    @Column(name = "voice_prompts")
    private Boolean voicePrompts;

    @OneToOne
    @JoinColumn(name = "cleaning_features_id",referencedColumnName = "id")
    private CleaningFeatures cleaningFeatures;

    @OneToOne
    @JoinColumn(name = "mopping_features_id",referencedColumnName = "id")
    private MoppingFeatures moppingFeatures;

    @OneToOne
    @JoinColumn(name = "batteries_id",referencedColumnName = "id")
    private Battery battery;

    @OneToOne
    @JoinColumn(name = "controls_id",referencedColumnName = "id")
    private Control control;

    @OneToOne
    @JoinColumn(name = "app_features_id",referencedColumnName = "id")
    private AppFeatures appFeatures;

    @OneToOne
    @JoinColumn(name = "sensors_id",referencedColumnName = "id")
    private Sensor sensor;

    @OneToOne
    @JoinColumn(name = "other_specifications_id",referencedColumnName = "id")
    private OtherSpecifications otherSpecifications;

    @OneToOne
    @JoinColumn(name = "purchase_links",referencedColumnName = "id")
    private PurchaseLink purchaseLink;


}
