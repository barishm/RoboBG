package com.robobg.entity;

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
@Table(name = "other_specifications")
public class OtherSpecifications {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "weight")
    private String weight;

    @Column(name = "width")
    private String width;

    @Column(name = "height")
    private String height;

    @Column(name = "in_the_box")
    private String inTheBox;

    @Column(name = "release_date")
    private String releaseDate;

    @Column(name = "warranty")
    private String warranty;
}
