package com.seek.api.model;

import javax.persistence.*;

/**
 * Created by langley on 8/5/17.
 */
@Entity
@Table(name = "reviewer")
public class Reviewer {

    @Id
    @Column(name = "id")
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;

    private String name;

    private String jobID;



}
