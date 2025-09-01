package com.project.mentor_konnect.mapper;

import com.project.mentor_konnect.DTO.IssueDTO;
import com.project.mentor_konnect.model.Issue;

public class IssueMapper {

    public static IssueDTO toDTO(Issue issue) {
        if (issue == null) return null;

        return new IssueDTO(
                issue.getId(),
                issue.getTitle(),
                issue.getDescription(),
                issue.getIssueType(),
                issue.getStatus(),
                issue.getCreatedAt(),
                issue.getUpdatedAt(),
                issue.getResolvedAt(),
                issue.getRaisedBy() != null ? issue.getRaisedBy().getId() : null
        );
    }
}
