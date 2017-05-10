package com.seek.api.model;

import lombok.Getter;
import lombok.Setter;

import javax.persistence.*;
import java.util.ArrayList;
import java.util.List;

/**
 * Created by langley on 8/5/17.
 */
@Entity
@Table(name = "job")
public class Job {

    @Id
    @Column(name = "id")
    @GeneratedValue(strategy = GenerationType.AUTO)
    @Setter @Getter private Long id;

    /**
     * created manager username.
     */
    @Column(name = "publisher")
    @Setter @Getter private String publisher;

    @Column(name = "title")
    @Setter @Getter private String title;

    @Column(name = "type")
    @Setter @Getter private String type;

    @Column(name = "company")
    @Setter @Getter private String company;

    @Column(name = "description")
    @Setter @Getter private String description;

    @Column(name = "status")
    @Enumerated(EnumType.STRING)
    @Setter @Getter private JobStatus status = JobStatus.OPEN;

    @OneToMany(mappedBy = "job", cascade = CascadeType.ALL, fetch = FetchType.EAGER)
    @Setter @Getter private List<Reviewer> reviewers = new ArrayList<>();

//    @OneToMany(mappedBy = "job", cascade = CascadeType.ALL)
//    @Setter @Getter private List<Application> applications;


    public Job() {
    }

    public Job(String publisher, String title, String type, String company, String description) {
        this.publisher = publisher;
        this.title = title;
        this.type = type;
        this.company = company;
        this.description = description;
    }

    public Job(String title, String type, String company, String description, List<Reviewer> reviewers) {
        this.title = title;
        this.type = type;
        this.company = company;
        this.description = description;
        this.reviewers = reviewers;
    }

    public Job(String publisher, String title, String type, String company, String description, JobStatus status) {
        this.publisher = publisher;
        this.title = title;
        this.type = type;
        this.company = company;
        this.description = description;
        this.status = status;
    }

    public Job(String publisher, String title, String type, String company, String description, JobStatus status, List<Reviewer> reviewers) {
        this.publisher = publisher;
        this.title = title;
        this.type = type;
        this.company = company;
        this.description = description;
        this.status = status;
        this.reviewers = reviewers;
    }

    @Override
    public String toString() {
        return "Job{" +
                "id=" + id +
                ", publisher='" + publisher + '\'' +
                ", title='" + title + '\'' +
                ", type='" + type + '\'' +
                ", company='" + company + '\'' +
                ", description='" + description + '\'' +
                ", status=" + status +
                ", reviewers=" + reviewers +
                '}';
    }
}
