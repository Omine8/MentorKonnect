package com.project.mentor_konnect.controller;

import com.project.mentor_konnect.DTO.LeaveRequestDTO;
import com.project.mentor_konnect.mapper.LeaveRequestMapper;
import com.project.mentor_konnect.model.Mentee;
import com.project.mentor_konnect.model.Mentor;
import com.project.mentor_konnect.model.LeaveRequest;
import com.project.mentor_konnect.service.LeaveRequestService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/leave-requests")
@RequiredArgsConstructor
public class LeaveRequestController {

    private final LeaveRequestService leaveRequestService;

    // Create a new leave request
    @PostMapping("/create")
    public ResponseEntity<LeaveRequestDTO> createLeaveRequest(@RequestBody LeaveRequestDTO dto) {
        Mentee mentee = new Mentee(); mentee.setId(dto.getMenteeId());
        Mentor mentor = new Mentor(); mentor.setId(dto.getMentorId());

        LeaveRequest leaveRequest = leaveRequestService.createLeaveRequest(
                mentee, mentor, dto.getStartDate(), dto.getEndDate(), dto.getReason()
        );

        return ResponseEntity.ok(LeaveRequestMapper.toDTO(leaveRequest));
    }

    // Update status
    @PutMapping("/{id}/status")
    public ResponseEntity<LeaveRequestDTO> updateStatus(
            @PathVariable Long id,
            @RequestBody LeaveRequestDTO dto
    ) {
        LeaveRequest leaveRequest = leaveRequestService.updateStatus(id, dto.getStatus());
        return ResponseEntity.ok(LeaveRequestMapper.toDTO(leaveRequest));
    }

    // Get mentee requests
    @GetMapping("/mentee/{id}")
    public ResponseEntity<List<LeaveRequestDTO>> getMenteeRequests(@PathVariable Long id) {
        Mentee mentee = new Mentee(); mentee.setId(id);
        List<LeaveRequestDTO> result = leaveRequestService.getMenteeRequests(mentee)
                .stream()
                .map(LeaveRequestMapper::toDTO)
                .collect(Collectors.toList());
        return ResponseEntity.ok(result);
    }

    // Get mentor requests
    @GetMapping("/mentor/{id}")
    public ResponseEntity<List<LeaveRequestDTO>> getMentorRequests(@PathVariable Long id) {
        Mentor mentor = new Mentor(); mentor.setId(id);
        List<LeaveRequestDTO> result = leaveRequestService.getMentorRequests(mentor)
                .stream()
                .map(LeaveRequestMapper::toDTO)
                .collect(Collectors.toList());
        return ResponseEntity.ok(result);
    }
}
