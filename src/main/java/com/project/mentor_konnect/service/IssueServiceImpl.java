package com.project.mentor_konnect.service;

import com.project.mentor_konnect.model.Issue;
import com.project.mentor_konnect.model.Mentee;
import com.project.mentor_konnect.model.User;
import com.project.mentor_konnect.repo.IssueRepository;
import com.project.mentor_konnect.repo.MenteeRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@Service
@RequiredArgsConstructor
public class IssueServiceImpl implements IssueService {

    private final IssueRepository issueRepository;
    private final MenteeRepository menteeRepository;

    @Override
    public Issue createIssue(User mentee, String title, String description, Issue.IssueType type) {
        Issue issue = Issue.builder()
                .title(title)
                .description(description)
                .issueType(type)
                .status(Issue.IssueStatus.OPEN)
                .raisedBy(mentee)
                .createdAt(LocalDateTime.now())
                .updatedAt(LocalDateTime.now())
                .build();

        return issueRepository.save(issue);
    }

    @Override
    public List<Issue> getMentorIssues(Long mentorId) {
        // ✅ Step 1: find all mentees under this mentor
        List<Mentee> mentees = menteeRepository.findAllByMentor_Id(mentorId);

        // ✅ Step 2: collect issues raised by those mentees
        List<Issue> issues = new ArrayList<>();
        for (Mentee mentee : mentees) {
            issues.addAll(issueRepository.findByRaisedBy_Id(mentee.getUser().getId()));
        }

        return issues;
    }

    @Override
    public List<Issue> getMenteeIssues(User mentee) {
        return issueRepository.findByRaisedBy(mentee);
    }

    @Override
    public Issue getIssueById(Long id) {
        return issueRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Issue not found with ID: " + id));
    }

    @Override
    public Issue updateStatus(Long id, Issue.IssueStatus status) {
        Issue issue = getIssueById(id);
        issue.setStatus(status);
        issue.setUpdatedAt(LocalDateTime.now());

        if (status == Issue.IssueStatus.RESOLVED) {
            issue.setResolvedAt(LocalDateTime.now());
        }

        return issueRepository.save(issue);
    }
}
