package com.project.mentor_konnect.service;

import com.project.mentor_konnect.model.*;
import com.project.mentor_konnect.repo.LeaveRequestRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.List;

@Service
@RequiredArgsConstructor
public class LeaveRequestService {

    private final LeaveRequestRepository leaveRequestRepository;

    @Transactional
    public LeaveRequest createLeaveRequest(Mentee mentee, Mentor mentor,
                                           java.time.LocalDate start,
                                           java.time.LocalDate end,
                                           String reason) {
        if (end.isBefore(start)) {
            throw new IllegalArgumentException("End date cannot be before start date");
        }

        LeaveRequest leaveRequest = LeaveRequest.builder()
                .createdAt(LocalDateTime.now())
                .startDate(start)
                .endDate(end)
                .reason(reason)
                .status(LeaveRequest.LeaveRequestStatus.PENDING)
                .mentee(mentee)
                .mentor(mentor)
                .build();

        return leaveRequestRepository.save(leaveRequest);
    }

    @Transactional
    public LeaveRequest updateStatus(Long requestId, LeaveRequest.LeaveRequestStatus status) {
        LeaveRequest leaveRequest = leaveRequestRepository.findById(requestId)
                .orElseThrow(() -> new RuntimeException("Leave request not found"));
        leaveRequest.setStatus(status);
        return leaveRequestRepository.save(leaveRequest);
    }

    public List<LeaveRequest> getMenteeRequests(Mentee mentee) {
        return leaveRequestRepository.findByMentee(mentee);
    }

    public List<LeaveRequest> getMentorRequests(Mentor mentor) {
        return leaveRequestRepository.findByMentor(mentor);
    }
}
