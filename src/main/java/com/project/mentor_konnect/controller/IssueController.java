package com.project.mentor_konnect.controller;

import com.project.mentor_konnect.DTO.IssueDTO;
import com.project.mentor_konnect.mapper.IssueMapper;
import com.project.mentor_konnect.model.Issue;
import com.project.mentor_konnect.model.Mentee;
import com.project.mentor_konnect.repo.MenteeRepository;
import com.project.mentor_konnect.service.IssueService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/issues")
@RequiredArgsConstructor
public class IssueController {

    private final IssueService issueService;
    private final MenteeRepository menteeRepository;

    // ✅ Create new issue by mentee
    @PostMapping("/create/{menteeId}")
    public IssueDTO createIssue(@PathVariable Long menteeId, @RequestBody IssueDTO issueDTO) {
        Mentee mentee = menteeRepository.findById(menteeId)
                .orElseThrow(() -> new RuntimeException("Mentee not found with ID: " + menteeId));

        Issue issue = issueService.createIssue(
                mentee.getUser(), // we pass the linked User
                issueDTO.getTitle(),
                issueDTO.getDescription(),
                issueDTO.getIssueType()
        );

        return IssueMapper.toDTO(issue);
    }

    // ✅ Fetch all issues for a mentor (using menteeRepository)
    @GetMapping("/mentor/{mentorId}")
    public List<IssueDTO> getIssuesForMentor(@PathVariable Long mentorId) {
        List<Mentee> mentees = menteeRepository.findByMentorId(mentorId);

        return mentees.stream()
                .flatMap(mentee -> issueService.getMenteeIssues(mentee.getUser()).stream())
                .map(IssueMapper::toDTO)
                .collect(Collectors.toList());
    }

    // ✅ Fetch issues for a single mentee
    @GetMapping("/mentee/{menteeId}")
    public List<IssueDTO> getIssuesForMentee(@PathVariable Long menteeId) {
        Mentee mentee = menteeRepository.findById(menteeId)
                .orElseThrow(() -> new RuntimeException("Mentee not found with ID: " + menteeId));

        return issueService.getMenteeIssues(mentee.getUser())
                .stream()
                .map(IssueMapper::toDTO)
                .toList();
    }

    // ✅ Get single issue by ID
    @GetMapping("/{id}")
    public IssueDTO getIssueById(@PathVariable Long id) {
        return IssueMapper.toDTO(issueService.getIssueById(id));
    }

    // ✅ Update issue status (mentor can update progress, resolved, etc.)
    @PutMapping("/{id}/status")
    public IssueDTO updateIssueStatus(@PathVariable Long id, @RequestParam Issue.IssueStatus status) {
        return IssueMapper.toDTO(issueService.updateStatus(id, status));
    }
}
