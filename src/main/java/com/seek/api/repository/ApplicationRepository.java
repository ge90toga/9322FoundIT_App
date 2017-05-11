package com.seek.api.repository;

import com.seek.api.model.Application;
import com.seek.api.model.Job;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

/**
 * Created by langley on 8/5/17.
 */
public interface ApplicationRepository extends JpaRepository<Application, Long> {

    List<Application> findByJobID(String jobID);

    List<Application> findByUserID(String applicant);

}
