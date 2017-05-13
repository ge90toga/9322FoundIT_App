
package com.seek.api.commandline;

import com.seek.api.dto.UserDTO;
import com.seek.api.model.*;
import com.seek.api.service.JobService;
import com.seek.api.service.MailService;
import com.seek.api.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;

import java.util.ArrayList;
import java.util.List;

/**
 * initial data at application startup.
 */
@Component
public class DataInitializer implements CommandLineRunner {

    @Autowired
    UserService userService;

    @Autowired
    JobService jobService;

    @Autowired
    MailService mailService;

    @Override
    public void run(String... arg0) throws Exception {
//        addUser();
//        testJobs();
//        mailService.sendMail("ruan.yuji@gmail.com", "hello", "123");
    }

    private void addUser() {
        userService.createUser(new UserDTO("295046974@qq.com", "123", "frank", "ROLE_ADMIN"));
        userService.createUser(new UserDTO("ruan.yuji@gmail.com", "123", "yuji", "ROLE_USER"));
        userService.createUser(new UserDTO("test@gmail.com", "123", "test1", "ROLE_USER"));
        userService.createUser(new UserDTO("review1@gmail.com", "123", "review1", "ROLE_REVIEWER"));
        userService.createUser(new UserDTO("review2@gmail.com", "123", "review2", "ROLE_REVIEWER"));
    }

    private void testJobs() {
        Job job1 = new Job("295046974@qq.com", "Java Dev", "full-time", "Google", "hello", JobStatus.OPEN);
        jobService.addJob(job1);
//        Job job2 = new Job("Frank1", "Java Dev", "full-time", "Google", "hello", JobStatus.OPEN);
//        jobService.addJob(job2);
//        System.out.println("exist job: " + jobService.existJob(2L));
//        Job job1 = jobService.findJobByID(2L);
//        System.out.println(job1);
//        job1.setStatus(JobStatus.CLOSED);
        Reviewer reviewer1 = new Reviewer("review1@gmail.com", "review1", job1);
        Reviewer reviewer2 = new Reviewer("review2@gmail.com", "review2", job1);
        List<Reviewer> reviewerList = new ArrayList<>();
        reviewerList.add(reviewer1);
        reviewerList.add(reviewer2);
        job1.setReviewers(reviewerList);
        jobService.addJob(job1);
        System.out.println(job1);
        Application application = new Application("1", "1", "12xx@qq.com", "123123", ApplicationStatus.WAITING);
        jobService.addApplication(application);
        Review review = new Review("1", "1","1", "xiaomeimei", "hellllo", true);
        jobService.addReview(review);

//        List<Job> jobList = jobService.findAllJob();
//        System.out.println(jobList.size());
//        Job j = jobService.findJobByID(1L);
//        System.out.println(j);
    }

}