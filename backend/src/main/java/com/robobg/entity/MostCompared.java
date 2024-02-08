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
@Table(name = "most_compared")
public class MostCompared {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "order_")
    private Integer order;

    @OneToOne
    private Robot robot1;

    @OneToOne
    private Robot robot2;

    @OneToOne
    private Robot robot3;

}
