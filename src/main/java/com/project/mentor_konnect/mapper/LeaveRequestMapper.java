package com.project.mentor_konnect.mapper;

import com.project.mentor_konnect.DTO.LeaveRequestDTO;
import com.project.mentor_konnect.model.LeaveRequest;

public class LeaveRequestMapper {

    public static LeaveRequestDTO toDTO(LeaveRequest leaveRequest) {
        if (leaveRequest == null) return null;

        return new LeaveRequestDTO(
                leaveRequest.getId(),
                leaveRequest.getCreatedAt(),
                leaveRequest.getStartDate(),
                leaveRequest.getEndDate(),
                leaveRequest.getReason(),
                leaveRequest.getStatus(),
                leaveRequest.getMentee().getId(),
                leaveRequest.getMentor().getId()
        );
    }
}
