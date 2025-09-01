package com.project.mentor_konnect.controller;

import com.project.mentor_konnect.DTO.MentorDTO;
import com.project.mentor_konnect.service.MenteeService;
import com.project.mentor_konnect.service.MentorQueryService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@RequestMapping("/api/mentees")
@RequiredArgsConstructor
public class MenteeController {

    private final MenteeService menteeService;
    private final MentorQueryService mentorQueryService; // ✅ inject query service

    // 🔹 Get assigned Mentor ID for a Mentee
    @GetMapping("/{menteeId}/mentor-id")
    public ResponseEntity<?> getMentorId(@PathVariable Long menteeId) {
        try {
            Long mentorId = menteeService.getAssignedMentorId(menteeId);
            return ResponseEntity.ok(Map.of("mentorId", mentorId));
        } catch (RuntimeException ex) {
            return ResponseEntity.status(404).body(Map.of("error", ex.getMessage()));
        }
    }

    // 🔹 Get full Mentee details
    @GetMapping("/{menteeId}")
    public ResponseEntity<?> getMenteeById(@PathVariable Long menteeId) {
        try {
            return ResponseEntity.ok(menteeService.getMenteeDetailsById(menteeId));
        } catch (RuntimeException ex) {
            return ResponseEntity.status(404).body(Map.of("error", ex.getMessage()));
        }
    }

    // 🔹 Get Mentor details for a given Mentee
    @GetMapping("/{menteeId}/mentor")
    public ResponseEntity<?> getMentorByMenteeId(@PathVariable Long menteeId) {
        try {
            MentorDTO mentor = mentorQueryService.getMentorByMenteeId(menteeId);
            return ResponseEntity.ok(mentor);
        } catch (RuntimeException ex) {
            return ResponseEntity.status(404).body(Map.of("error", ex.getMessage()));
        }
    }
}
