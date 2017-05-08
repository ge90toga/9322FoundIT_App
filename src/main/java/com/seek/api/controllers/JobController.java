package com.seek.api.controllers;

import com.seek.api.model.Job;
import com.seek.api.repository.UserRepository;
import com.seek.api.security.JwtTokenHandler;
import com.seek.api.service.JobService;
import com.seek.api.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

/**
 * Created by langley on 8/5/17.
 */
@RestController
@RequestMapping("/api/jobs")
public class JobController {

    private final UserRepository userRepository;
    private final UserService userService;
    private final JobService jobService;
    private final JwtTokenHandler jwtTokenHandler;

    @Autowired
    public JobController(UserRepository userRepository, UserService userService, JobService jobService, JwtTokenHandler jwtTokenHandler) {
        this.userRepository = userRepository;
        this.userService = userService;
        this.jobService = jobService;
        this.jwtTokenHandler = jwtTokenHandler;
    }

    @RequestMapping(method = RequestMethod.GET)
    public ResponseEntity<?> getAllJobs() {
        List<Job> allPosts =  jobService.findAllJob();
        return new ResponseEntity<>(allPosts, HttpStatus.OK);
    }

    @RequestMapping(value = "/{id}", method = RequestMethod.GET)
    public ResponseEntity<Job> getJobById(@PathVariable Long id) {
        Job job = jobService.findJobByID(id);
        return new ResponseEntity<>(job, HttpStatus.OK);
    }

    @RequestMapping(method = RequestMethod.POST)
    public ResponseEntity<Job> addNewJob(@RequestBody Job job) {
        jobService.addJob(job);
        return new ResponseEntity<>(job, HttpStatus.CREATED);
    }

    @RequestMapping(method = RequestMethod.PUT)
    public ResponseEntity<Job> updateJob(@RequestBody Job job) {
        jobService.updateJob(job);
        return new ResponseEntity<>(job, HttpStatus.CREATED);
    }

    @RequestMapping(value = "/{id}", method = RequestMethod.DELETE)
    public ResponseEntity<?> deletePostById( @PathVariable Long id) {
        jobService.deleteJob(id);
        return new ResponseEntity<>(id, HttpStatus.OK);
    }

}
