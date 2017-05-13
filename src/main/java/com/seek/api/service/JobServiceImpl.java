package com.seek.api.service;

import com.seek.api.dto.ApplicationDTO;
import com.seek.api.dto.ReviewDTO;
import com.seek.api.model.*;
import com.seek.api.repository.ApplicationRepository;
import com.seek.api.repository.JobRepository;
import com.seek.api.repository.ReviewRepository;
import com.seek.api.repository.ReviewerRepository;
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
    private ReviewerRepository reviewerRepository;

    @Autowired
    public JobServiceImpl(JobRepository jobRepository, ApplicationRepository applicationRepository, ReviewRepository reviewRepository,
                          ReviewerRepository reviewerRepository){
        this.jobRepository = jobRepository;
        this.applicationRepository = applicationRepository;
        this.reviewRepository = reviewRepository;
        this.reviewerRepository = reviewerRepository;
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
    public List<Job> findJobByPublisher(String publisher) {
        return jobRepository.findByPublisher(publisher);
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
    public List<Application> findApplicationByApplicant(String applicant) {
        return applicationRepository.findByUserID(applicant);
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
    public List<ReviewDTO> findReviewComboByUserID(String username) {
        List<ReviewDTO> reviewDTOS = new ArrayList<>();

        List<Reviewer> reviewerList = reviewerRepository.findByUsername(username);

        if (reviewerList == null || reviewerList.isEmpty()) {
            System.err.println("findReviewComboByUserID | reviewer list not found.");
            return reviewDTOS;
        }

        for (Reviewer reviewer : reviewerList) {

            if (reviewer.getJob() == null) {
                System.err.println("findReviewComboByUserID | reviewer job is null.");
                continue;
            }

            List<Application> applications = findApplicationByJobID(reviewer.getJob().getId().toString());
            if (applications == null || applications.isEmpty()) {
                System.err.println("findReviewComboByUserID | application not found.");
                return reviewDTOS;
            }

            for (Application application : applications) {
                ReviewDTO reviewDTO = new ReviewDTO();
                reviewDTO.setReviewerID(username);
                reviewDTO.setJobID(reviewer.getJob().getId().toString());
                reviewDTO.setJobTitle(reviewer.getJob().getTitle());
                reviewDTO.setCv(application.getCv());
                reviewDTO.setApplicationID(application.getId().toString());
                reviewDTO.setApplicantName(application.getEmail());

                Review review = reviewRepository.findByApplicationIDAndReviewerID(application.getId().toString(), username);

                if (review == null) {
                    System.err.println("findReviewComboByUserID | review not found.");
                    reviewDTOS.add(reviewDTO);
                } else {
                    reviewDTO.setReviewID(review.getId().toString());
                    reviewDTO.setContent(review.getContent());
                    reviewDTO.setResult(review.isResult());
                    reviewDTOS.add(reviewDTO);
                }

            }

        }

        return reviewDTOS;
    }

    @Override
    public List<ApplicationDTO> findApplicationComboByPublisher(String username) {
        List<ApplicationDTO> applicationDTOS = new ArrayList<>();
        List<Job> jobs = findJobByPublisher(username);
        if (jobs.isEmpty()) {
            System.err.println("findApplicationComboByPublisher | job not found.");
            return applicationDTOS;
        }

        for (Job job : jobs) {

            List<Application> applications = findApplicationByJobID(job.getId().toString());

            if (applications.isEmpty()) {
                System.err.println("findApplicationComboByPublisher | app not found.");
                return applicationDTOS;
            }

            for (Application application : applications) {
                ApplicationDTO applicationDTO = new ApplicationDTO();
                applicationDTO.setPublisher(username);
                applicationDTO.setJobID(job.getId().toString());
                applicationDTO.setJobTitle(job.getTitle());
                applicationDTO.setJobStatus(job.getStatus());
                applicationDTO.setApplicationID(application.getId().toString());
                applicationDTO.setApplicant(application.getEmail());
                applicationDTO.setApplicationStatus(application.getStatus());
                applicationDTOS.add(applicationDTO);
            }

        }

        return applicationDTOS;
    }
}
