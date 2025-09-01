package com.project.mentor_konnect.model;

import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDateTime;

@Entity
@Table(name = "issue")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Issue {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String title;
    private String description;

    @Enumerated(EnumType.STRING)
    private IssueType issueType;

    @Enumerated(EnumType.STRING)
    private IssueStatus status = IssueStatus.OPEN;  // default status

    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;
    private LocalDateTime resolvedAt;

    @ManyToOne
    @JoinColumn(name = "raised_by_id")
    private User raisedBy;

    public enum IssueType { PROBLEM, COMPLAINT }

    public enum IssueStatus { OPEN, IN_PROGRESS, RESOLVED }
}
