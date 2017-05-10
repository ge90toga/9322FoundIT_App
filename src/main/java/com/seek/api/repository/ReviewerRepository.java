package com.seek.api.repository;

import com.seek.api.model.Review;
import com.seek.api.model.Reviewer;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

/**
 * Created by langley on 8/5/17.
 */
public interface ReviewerRepository extends JpaRepository<Reviewer, Long> {

    List<Reviewer> findByUsername(String username);

}
