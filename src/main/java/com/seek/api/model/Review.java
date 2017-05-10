package com.seek.api.model;

import lombok.Getter;
import lombok.Setter;

import javax.persistence.*;

/**
 * Created by langley on 8/5/17.
 */
@Entity
@Table(name = "review")
public class Review {

    /**
     * review id.
     */
    @Id
    @Column(name = "id")
    @GeneratedValue(strategy = GenerationType.AUTO)
    @Setter @Getter private Long id;

    @Column(name = "job_id")
    @Setter @Getter private String jobID;

    @Column(name = "application_id")
    @Setter @Getter private String applicationID;

    /**
     * reviewer username.
     */
    @Column(name = "reviewer_id")
    @Setter @Getter private String reviewerID;

    @Column(name = "reviewer_name")
    @Setter @Getter private String reviewerName;

    @Column(name = "content")
    @Setter @Getter private String content;

    @Column(name = "result")
    @Setter @Getter private boolean result;

    public Review() {
    }

    public Review(String jobID, String applicationID, String reviewerID, String reviewerName, String content, boolean result) {
        this.jobID = jobID;
        this.applicationID = applicationID;
        this.reviewerID = reviewerID;
        this.reviewerName = reviewerName;
        this.content = content;
        this.result = result;
    }

    @Override
    public String toString() {
        return "Review{" +
                "id=" + id +
                ", jobID='" + jobID + '\'' +
                ", applicationID='" + applicationID + '\'' +
                ", reviewerID='" + reviewerID + '\'' +
                ", reviewerName='" + reviewerName + '\'' +
                ", content='" + content + '\'' +
                ", result=" + result +
                '}';
    }
}
