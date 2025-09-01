package com.project.mentor_konnect.repo;

import com.project.mentor_konnect.model.Issue;
import com.project.mentor_konnect.model.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface IssueRepository extends JpaRepository<Issue, Long> {
    // fetch all issues created by a given mentee (using their user.id)
    List<Issue> findByRaisedBy_Id(Long menteeUserId);

    List<Issue> findByRaisedBy(User user);
}