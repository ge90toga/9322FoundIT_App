package com.seek.api.controllers;

import com.seek.api.model.Job;
import com.seek.api.model.Reviewer;
import com.seek.api.repository.UserRepository;
import com.seek.api.security.JwtTokenHandler;
import com.seek.api.service.JobService;
import com.seek.api.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;

/**
 * Created by langley on 8/5/17.
 */
@RestController
@RequestMapping("/api/jobs")
public class JobController {

    private final UserService userService;
    private final JobService jobService;

    @Autowired
    public JobController(UserService userService, JobService jobService) {
        this.userService = userService;
        this.jobService = jobService;
    }

    @RequestMapping(method = RequestMethod.GET)
    public ResponseEntity<?> getAllJobs(@RequestParam(value = "title", required = false) String title) {
        List<Job> jobs = new ArrayList<>();
        if (title != null && !title.isEmpty()) {
            jobs = jobService.findJobByName(title);
        } else {
            jobs = jobService.findAllJob();
        }
        return new ResponseEntity<>(jobs, HttpStatus.OK);
    }

    @RequestMapping(value = "/{id}", method = RequestMethod.GET)
    public ResponseEntity<Job> getJobById(@PathVariable Long id) {
        Job job = jobService.findJobByID(id);
        return new ResponseEntity<>(job, HttpStatus.OK);
    }

    @RequestMapping(method = RequestMethod.POST)
    public ResponseEntity<Job> addNewJob(@RequestBody Job job) {
        // Get user from token
        String username = SecurityContextHolder.getContext().getAuthentication().getName();
        job.setPublisher(username);
        for (Reviewer reviewer : job.getReviewers()) {
            reviewer.setJob(job);
        }
        jobService.addJob(job);
        return new ResponseEntity<>(job, HttpStatus.CREATED);
    }

    @RequestMapping(method = RequestMethod.PUT)
    public ResponseEntity<Job> updateJob(@RequestBody Job job) {
        jobService.updateJob(job);
        return new ResponseEntity<>(job, HttpStatus.OK);
    }

    @RequestMapping(value = "/{id}", method = RequestMethod.DELETE)
    public ResponseEntity<?> deletePostById( @PathVariable Long id) {
        jobService.deleteJob(id);
        return new ResponseEntity<>(id, HttpStatus.OK);
    }

}
