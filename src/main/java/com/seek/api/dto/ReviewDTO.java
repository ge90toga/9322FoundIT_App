package com.seek.api.dto;

import lombok.Getter;
import lombok.Setter;

/**
 * Created by langley on 9/5/17.
 */
public class ReviewDTO {

    /**
     * reviewer username (email).
     */
    @Setter @Getter private String reviewerID;

    @Setter @Getter private String reviewID;

    @Setter @Getter private String content;

    @Setter @Getter private boolean result;

    @Setter @Getter private String jobID;

    @Setter @Getter private String jobTitle;

    @Setter @Getter private String cv;

    @Setter @Getter private String applicationID;

    @Setter @Getter private String applicantName;

}
