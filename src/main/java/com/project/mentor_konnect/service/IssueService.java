package com.project.mentor_konnect.service;

import com.project.mentor_konnect.model.Issue;
import com.project.mentor_konnect.model.User;

import java.util.List;

public interface IssueService {
    Issue createIssue(User mentee, String title, String description, Issue.IssueType type);
    List<Issue> getMentorIssues(Long mentorId);
    List<Issue> getMenteeIssues(User mentee);
    Issue getIssueById(Long id);
    Issue updateStatus(Long id, Issue.IssueStatus status);
}
