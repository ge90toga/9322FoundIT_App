package com.seek.api.service;


import com.seek.api.dto.ReviewDTO;
import com.seek.api.dto.UserDTO;
import com.seek.api.model.Application;
import com.seek.api.model.Job;
import com.seek.api.model.Review;
import com.seek.api.model.User;

import java.util.List;
import java.util.Optional;

public interface JobService {

    void addJob(Job job);

    void updateJob(Job job);

    void deleteJob(Long id);

    boolean existJob(Long id);

    Job findJobByID(Long id);

    List<Job> findJobByPublisherID(String publisherID);

    List<Job> findJobByName(String name);

    List<Job> findAllJob();

    void addApplication(Application application);

    void updateApplication(Application application);

    Application findApplicationByID(Long id);

    List<Application> findApplicationByJobID(String jobID);

    List<Application> findAllApplication();

    void addReview(Review review);

    void updateReview(Review review);

    Review findReviewByID(Long id);

    List<Review> findReviewByAppID(String appID);

    List<ReviewDTO> findReviewComboByUserID(String userID);

}