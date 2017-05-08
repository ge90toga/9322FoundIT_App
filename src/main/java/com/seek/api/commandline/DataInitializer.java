
package com.seek.api.commandline;

import java.util.*;

import com.seek.api.dto.UserDTO;
import com.seek.api.model.*;
import com.seek.api.service.JobService;
import com.seek.api.service.PostService;
import com.seek.api.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;

/**
 * initial data at application startup.
 */
@Component
public class DataInitializer implements CommandLineRunner {

    @Autowired
    PostService postService;

    @Autowired
    UserService userService;

    @Autowired
    JobService jobService;

    @Override
    public void run(String... arg0) throws Exception {
        userService.createUser(new UserDTO("ruan.yuji@gmail.com", "123", "yuji", "ROLE_USER"));
        userService.createUser(new UserDTO("test@gmail.com", "123", "test", "ROLE_USER"));
        userService.createUser(new UserDTO("295046974@qq.com", "123", "frank", "ROLE_ADMIN"));
        testJobs();
    }

    private void testJobs() {
//	    Job job = new Job("Frank1", "Java Dev", "full-time", "Google", "hello", JobStatus.OPEN);
//        jobService.addJob(job);
//        Job job0 = new Job("Frank1", "Java Dev", "full-time", "Google", "hello", JobStatus.OPEN);
//        jobService.addJob(job0);
        System.out.println("exist job: " + jobService.existJob(2L));
        Job job1 = jobService.findJobByID(2L);
        System.out.println(job1);
        job1.setStatus(JobStatus.CLOSED);
        jobService.updateJob(job1);
        System.out.println(job1);
        Application application = new Application("1", "1", "12xx@qq.com", "123123", ApplicationStatus.WAITING);
        jobService.addApplication(application);
        Review review = new Review("1", "1","1", "xiaomeimei", "hellllo", true);
        jobService.addReview(review);
    }

    private List<Job> generateJobs() {
        List<Job> jobs = new ArrayList<>();

        return jobs;
    }
//        generatePosts().stream().forEach(p -> postService.save(p));
//        userService.createUser(new UserDTO("ruan.yuji@gmail.com", "123", "yuji", "ROLE_USER"));
//        userService.createUser(new UserDTO("mock@gmail.com", "123", "mock", "ROLE_USER"));
//        userService.createUser(new UserDTO("295046974@qq.com", "123", "frank", "ROLE_ADMIN"));

    private List<Post> generatePosts() {
        List posts = new ArrayList();

        Post post1 = new Post();
        post1.setAuthor("vhoang55");
        post1.setContent("A blog content to combine some cool tech stack together using " +
                "Spring boot/Spring Security, Angular-2 (still in beta CR-3), and Json WebToken. As" +
                "of right now, Angular 2 is still in CR-3, their teams are moving fast and ");

        post1.setDate(new Date().toString());
        post1.setTitle("Spring boot/security, angular2, jtw");



        Post post2 = new Post();
        post2.setAuthor("vhoang55");
        post2.setContent("Angular 2 is a really cool web framework. It's built on top of Typescript" +
                " and RxJs. The web is moving fast, and seems like the industry is moving toward the" +
                " reactive programming model. It's a new shift in programming paradigm. <br> <br>" +
                " Look like the upcoming release of Spring 5 is also all about functional reactive reactive programming. <br>" +
                " Here is the link <a href=\"https://github.com/vhoang55/spring-rest-futures\"> Spring rest futures </a> to project that uses some of the cool libraries to enable" +
                " such reactive programming model. <br><br>" +
                " Definitely requires some deep learning curve but worth learning and can't wait for" +
                " the exiting time ahead. Can't wait to see where the industry is heading next."
        );
        post2.setDate(new Date().toString());
        post2.setTitle("Reactive programming model");

        posts.add(post1);
        posts.add(post2);

        return  posts;

    }


}
