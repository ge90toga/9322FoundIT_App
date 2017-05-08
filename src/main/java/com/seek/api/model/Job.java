package com.seek.api.model;

import lombok.Getter;
import lombok.Setter;

import javax.persistence.*;
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
     * created manager id.
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

//    @OneToMany(fetch = FetchType.LAZY, cascade = {CascadeType.ALL})
//    @JoinColumn(name="application_id")
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

    public Job(String publisher, String title, String type, String company, String description, JobStatus status) {
        this.publisher = publisher;
        this.title = title;
        this.type = type;
        this.company = company;
        this.description = description;
        this.status = status;
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
                '}';
    }

}
