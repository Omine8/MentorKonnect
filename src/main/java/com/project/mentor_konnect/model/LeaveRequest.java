package com.project.mentor_konnect.model;

import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDate;
import java.time.LocalDateTime;

@Entity
@Table(name = "leave_request")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class LeaveRequest extends AbstractPersistable {

    private LocalDateTime createdAt;

    private LocalDate startDate;

    private LocalDate endDate;

    @Column(nullable = false, length = 500)
    private String reason;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private LeaveRequestStatus status = LeaveRequestStatus.PENDING;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "mentee_id", nullable = false)
    private Mentee mentee;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "mentor_id", nullable = false)
    private Mentor mentor;

    public enum LeaveRequestStatus {
        PENDING,    // Default when mentee creates request
        APPROVED,   // Mentor approves
        REJECTED,   // Mentor rejects
        CANCELLED   // Mentee cancels before review
    }


}
