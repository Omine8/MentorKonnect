package com.project.mentor_konnect.DTO;

import com.project.mentor_konnect.model.Issue;

import java.time.LocalDateTime;

public class IssueDTO {
    private Long id;
    private String title;
    private String description;
    private Issue.IssueType issueType;
    private Issue.IssueStatus status;
    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;
    private LocalDateTime resolvedAt;
    private Long menteeId;   // ✅ only menteeId now

    // Full constructor
    public IssueDTO(Long id, String title, String description, Issue.IssueType issueType,
                    Issue.IssueStatus status, LocalDateTime createdAt,
                    LocalDateTime updatedAt, LocalDateTime resolvedAt,
                    Long menteeId) {
        this.id = id;
        this.title = title;
        this.description = description;
        this.issueType = issueType;
        this.status = status;
        this.createdAt = createdAt;
        this.updatedAt = updatedAt;
        this.resolvedAt = resolvedAt;
        this.menteeId = menteeId;
    }

    // Factory: Create new issue
    public static IssueDTO create(String title, String description,
                                  Issue.IssueType issueType,
                                  Long menteeId) {
        return new IssueDTO(null, title, description, issueType,
                Issue.IssueStatus.OPEN, null, null, null, menteeId);
    }

    // Factory: Update status
    public static IssueDTO updateStatus(Long id, Issue.IssueStatus status) {
        return new IssueDTO(id, null, null, null,
                status, null, null, null, null);
    }

    // Getters
    public Long getId() { return id; }
    public String getTitle() { return title; }
    public String getDescription() { return description; }
    public Issue.IssueType getIssueType() { return issueType; }
    public Issue.IssueStatus getStatus() { return status; }
    public LocalDateTime getCreatedAt() { return createdAt; }
    public LocalDateTime getUpdatedAt() { return updatedAt; }
    public LocalDateTime getResolvedAt() { return resolvedAt; }
    public Long getMenteeId() { return menteeId; }
}
