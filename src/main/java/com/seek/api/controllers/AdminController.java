package com.seek.api.controllers;

import com.seek.api.dto.ReviewDTO;
import com.seek.api.model.Review;
import com.seek.api.model.User;
import com.seek.api.repository.UserRepository;
import com.seek.api.security.JwtTokenHandler;
import com.seek.api.service.JobService;
import com.seek.api.service.UserService;
import io.swagger.annotations.ApiOperation;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/admin")
public class AdminController {

    private final UserService userService;
    private final JobService jobService;

    @Autowired
    public AdminController(UserService userService, JobService jobService) {
        this.userService = userService;
        this.jobService = jobService;
    }

    @ApiOperation(value = "List of Reviewers", response = ResponseEntity.class)
    @RequestMapping(value = "/reviewers", method = RequestMethod.GET)
    public ResponseEntity<?> getAllReviewers() {
        List<User> reviewers =  userService.findAllReviewer();
        return new ResponseEntity<>(reviewers, HttpStatus.OK);
    }

    @RequestMapping(value = "/review/combo", method = RequestMethod.GET)
    public ResponseEntity<?> getAllReviewCombo() {
        String username = SecurityContextHolder.getContext().getAuthentication().getName();
//        User user = userService.findUserByUsername(username).get();
        List<ReviewDTO> reviewDTOS = jobService.findReviewComboByUserID(username);
        return new ResponseEntity<>(reviewDTOS, HttpStatus.OK);
    }

    @RequestMapping(value = "/review/{id}", method = RequestMethod.GET)
    public ResponseEntity<Review> getReviewById(@PathVariable Long id) {
        Review review = jobService.findReviewByID(id);
        return new ResponseEntity<>(review, HttpStatus.OK);
    }

    @RequestMapping(value = "/review", method = RequestMethod.POST)
    public ResponseEntity<Review> addNewReview(@RequestBody Review review) {
        String username = SecurityContextHolder.getContext().getAuthentication().getName();
        User user = userService.findUserByUsername(username).get();
        review.setReviewerID(username);
        review.setReviewerName(user.getName());
        jobService.addReview(review);
        return new ResponseEntity<>(review, HttpStatus.CREATED);
    }

    @RequestMapping(value = "/review", method = RequestMethod.PUT)
    public ResponseEntity<Review> updateReview(@RequestBody Review review) {
        jobService.updateReview(review);
        return new ResponseEntity<>(review, HttpStatus.OK);
    }

}
