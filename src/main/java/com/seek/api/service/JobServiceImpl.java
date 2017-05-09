package com.seek.api.service;

import com.seek.api.dto.ReviewDTO;
import com.seek.api.model.*;
import com.seek.api.repository.ApplicationRepository;
import com.seek.api.repository.JobRepository;
import com.seek.api.repository.PostRepository;
import com.seek.api.repository.ReviewRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
import java.util.List;

@Service
@Transactional
public class JobServiceImpl implements JobService {

    private JobRepository jobRepository;
    private ApplicationRepository applicationRepository;
    private ReviewRepository reviewRepository;

    @Autowired
    public JobServiceImpl(JobRepository jobRepository, ApplicationRepository applicationRepository, ReviewRepository reviewRepository){
        this.jobRepository = jobRepository;
        this.applicationRepository = applicationRepository;
        this.reviewRepository = reviewRepository;
    }

    @Override
    public List<Job> findAllJob() {
        return jobRepository.findAll();
    }

    @Override
    public void addJob(Job job) {
        jobRepository.save(job);
    }

    @Override
    public void updateJob(Job job) {
        jobRepository.saveAndFlush(job);
    }

    @Override
    public void deleteJob(Long id) {
        jobRepository.delete(id);
    }

    @Override
    public boolean existJob(Long id) {
        return jobRepository.exists(id);
    }

    @Override
    public Job findJobByID(Long id) {
        return jobRepository.findOne(id);
    }

    @Override
    public List<Job> findJobByPublisherID(String publisherID) {
        return jobRepository.findByPublisher(publisherID);
    }

    @Override
    public List<Job> findJobByName(String name) {
        return jobRepository.findByTitleContaining(name);
    }


    @Override
    public void addApplication(Application application) {
        applicationRepository.save(application);
    }

    @Override
    public void updateApplication(Application application) {
        applicationRepository.saveAndFlush(application);
    }

    @Override
    public Application findApplicationByID(Long id) {
        return applicationRepository.findOne(id);
    }

    @Override
    public List<Application> findApplicationByJobID(String jobID) {
        return applicationRepository.findByJobID(jobID);
    }

    @Override
    public List<Application> findAllApplication() {
        return applicationRepository.findAll();
    }

    @Override
    public void addReview(Review review) {
        reviewRepository.save(review);
    }

    @Override
    public void updateReview(Review review) {
        reviewRepository.saveAndFlush(review);
    }

    @Override
    public Review findReviewByID(Long id) {
        return reviewRepository.findOne(id);
    }

    @Override
    public List<Review> findReviewByAppID(String appID) {
        return reviewRepository.findByApplicationID(appID);
    }

    @Override
    public List<ReviewDTO> findReviewComboByUserID(String userID) {
        List<ReviewDTO> reviewDTOS = new ArrayList<>();

        List<Job> jobs = findJobByPublisherID(userID);
        if (jobs == null || jobs.isEmpty()) {
            System.err.println("findReviewComboByUserID | job not found.");
            return reviewDTOS;
        }

        for (Job job : jobs) {

            List<Application> applications = findApplicationByJobID(job.getId().toString());
            if (applications == null || applications.isEmpty()) {
                System.err.println("findReviewComboByUserID | application not found.");
                return reviewDTOS;
            }

            for (Application application : applications) {
                ReviewDTO reviewDTO = new ReviewDTO();
                reviewDTO.setReviewerID(userID);
                reviewDTO.setJobTitle(job.getTitle());
                reviewDTO.setCv(application.getCv());
                reviewDTO.setApplicantName(application.getEmail());

                List<Review> reviews = findReviewByAppID(application.getId().toString());

                if (reviews == null || reviews.isEmpty()) {
                    System.err.println("findReviewComboByUserID | review not found.");
                    reviewDTOS.add(reviewDTO);
                    continue;
                }

                for (Review review : reviews) {
                    reviewDTO.setReviewID(review.getId().toString());
                    reviewDTO.setContent(review.getContent());
                    reviewDTO.setResult(review.isResult());
                    reviewDTOS.add(reviewDTO);
                    continue;
                }

            }

        }

        return reviewDTOS;
    }
}
