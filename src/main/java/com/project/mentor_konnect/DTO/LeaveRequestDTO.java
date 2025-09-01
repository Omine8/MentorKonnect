package com.project.mentor_konnect.DTO;

import com.project.mentor_konnect.model.LeaveRequest;

import java.time.LocalDate;
import java.time.LocalDateTime;

public class LeaveRequestDTO {

    private Long id;
    private LocalDateTime createdAt;
    private LocalDate startDate;
    private LocalDate endDate;
    private String reason;
    private LeaveRequest.LeaveRequestStatus status;
    private Long menteeId;
    private Long mentorId;

    // Full constructor (used internally or for responses)
    public LeaveRequestDTO(Long id, LocalDateTime createdAt, LocalDate startDate,
                           LocalDate endDate, String reason, LeaveRequest.LeaveRequestStatus status,
                           Long menteeId, Long mentorId) {
        this.id = id;
        this.createdAt = createdAt;
        this.startDate = startDate;
        this.endDate = endDate;
        this.reason = reason;
        this.status = status;
        this.menteeId = menteeId;
        this.mentorId = mentorId;
    }

    // Static factory for creating new leave requests
    public static LeaveRequestDTO createRequest(Long menteeId, Long mentorId,
                                                LocalDate startDate, LocalDate endDate,
                                                String reason) {
        return new LeaveRequestDTO(null, null, startDate, endDate, reason,
                LeaveRequest.LeaveRequestStatus.PENDING, menteeId, mentorId);
    }

    // Static factory for updating status
    public static LeaveRequestDTO updateStatus(Long id, LeaveRequest.LeaveRequestStatus status) {
        return new LeaveRequestDTO(id, null, null, null, null, status, null, null);
    }

    // Getters
    public Long getId() { return id; }
    public LocalDateTime getCreatedAt() { return createdAt; }
    public LocalDate getStartDate() { return startDate; }
    public LocalDate getEndDate() { return endDate; }
    public String getReason() { return reason; }
    public LeaveRequest.LeaveRequestStatus getStatus() { return status; }
    public Long getMenteeId() { return menteeId; }
    public Long getMentorId() { return mentorId; }
}
