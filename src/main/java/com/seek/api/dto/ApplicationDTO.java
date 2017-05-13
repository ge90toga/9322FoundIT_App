package com.seek.api.dto;

import com.seek.api.model.ApplicationStatus;
import com.seek.api.model.JobStatus;
import lombok.Getter;
import lombok.Setter;

/**
 * Created by langley on 10/5/17.
 */
public class ApplicationDTO {

    /**
     * job publisher username (email).
     */
    @Setter @Getter private String publisher;

    @Setter @Getter private String jobID;

    @Setter @Getter private String jobTitle;

    @Setter @Getter private JobStatus jobStatus;

    @Setter @Getter private String applicationID;

    /**
     * applicant username (email).
     */
    @Setter @Getter private String applicant;

//    @Setter @Getter private String applicantName;

    @Setter @Getter private ApplicationStatus applicationStatus;

}
