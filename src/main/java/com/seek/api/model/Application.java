package com.seek.api.model;

import lombok.Getter;
import lombok.Setter;

import javax.persistence.*;
import java.util.List;

/**
 * Created by langley on 8/5/17.
 */
@Entity
@Table(name = "application")
public class Application {

    /**
     * app id
     */
    @Id
    @Column(name = "id")
    @GeneratedValue(strategy = GenerationType.AUTO)
    @Setter @Getter private Long id;

    @Column(name = "job_id")
    @Setter @Getter private String jobID;

    /**
     * applicant username
     */
    @Column(name = "user_id")
    @Setter @Getter private String userID;

    @Column(name = "email")
    @Setter @Getter private String email;

    @Column(name = "cv")
    @Setter @Getter private String cv;

    @Column(name = "status")
    @Enumerated(EnumType.STRING)
    @Setter @Getter private ApplicationStatus status = ApplicationStatus.WAITING;

//    @OneToMany(fetch = FetchType.LAZY, cascade = {CascadeType.ALL})
//    @JoinColumn(name="review_id")
//    @Setter @Getter private List<Review> reviews;


    public Application() {
    }

    public Application(String jobID, String userID, String email, String cv) {
        this.jobID = jobID;
        this.userID = userID;
        this.email = email;
        this.cv = cv;
    }

    public Application(String jobID, String userID, String email, String cv, ApplicationStatus status) {
        this.jobID = jobID;
        this.userID = userID;
        this.email = email;
        this.cv = cv;
        this.status = status;
    }

    @Override
    public String toString() {
        return "Application{" +
                "id=" + id +
                ", jobID='" + jobID + '\'' +
                ", userID='" + userID + '\'' +
                ", email='" + email + '\'' +
                ", cv='" + cv + '\'' +
                ", status=" + status +
                '}';
    }
}
