package com.project.mentor_konnect.controller;

import com.project.mentor_konnect.DTO.MailDTO;
import com.project.mentor_konnect.DTO.MenteeDTO;
import com.project.mentor_konnect.DTO.MentorDTO;
import com.project.mentor_konnect.model.Mentor;
import com.project.mentor_konnect.model.Timetable;
import com.project.mentor_konnect.repo.MentorRepository;
import com.project.mentor_konnect.service.MailService;
import com.project.mentor_konnect.service.MenteeQueryService;
import com.project.mentor_konnect.service.MentorQueryService;
import com.project.mentor_konnect.service.TimetableService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.LinkedHashMap;
import java.util.List;
import java.util.Map;
import java.util.Optional;

@RestController
@RequestMapping("/api/mentor")
@RequiredArgsConstructor
public class MentorController {

    private final MentorRepository mentorRepo;
    private final MailService mailService;
    private final MenteeQueryService menteeQueryService;
    private final MentorQueryService mentorQueryService;
    private final TimetableService timetableService;

    /** ✅ Get mentor ID for the currently logged-in mentor */
    @GetMapping("/my-id")
    public ResponseEntity<?> getMentorIdByEmail(@RequestHeader("X-User-Email") String email) {
        try {
            Optional<Mentor> mentor = mentorRepo.findByUser_Email(email);
            if (mentor.isPresent()) {
                return ResponseEntity.ok(mentor.get().getId());
            } else {
                return ResponseEntity.status(404).body("Mentor not found for email: " + email);
            }
        } catch (Exception e) {
            return ResponseEntity.status(500).body("Error getting mentor ID: " + e.getMessage());
        }
    }

    /** ✅ Get mentees for a specific mentor ID */
    @GetMapping("/mentees")
    public ResponseEntity<?> getMenteesByMentorId(@RequestParam Long mentorId) {
        try {
            List<MenteeDTO> mentees = menteeQueryService.getFullMenteesByMentorId(mentorId);
            if (mentees.isEmpty()) {
                return ResponseEntity.status(404).body("No mentees found for mentor ID: " + mentorId);
            }
            return ResponseEntity.ok(mentees);
        } catch (Exception e) {
            return ResponseEntity.status(500).body("Error retrieving mentees: " + e.getMessage());
        }
    }

    /** ✅ Send email to selected mentees of the logged-in mentor */
    @PostMapping("/notify-mentees")
    public ResponseEntity<Map<String, String>> notifyMentees(@RequestBody MailDTO mailDto) {
        Map<String, String> results = new LinkedHashMap<>();

        if (mailDto.getRecipients() == null || mailDto.getRecipients().isEmpty()) {
            results.put("error", "⚠️ No recipients provided.");
            return ResponseEntity.badRequest().body(results);
        }

        for (String recipient : mailDto.getRecipients()) {
            try {
                mailService.sendEmail(recipient, mailDto.getSubject(), mailDto.getMessage());
                results.put(recipient, "✅ Sent");
            } catch (Exception e) {
                results.put(recipient, "❌ Failed: " + e.getMessage());
            }
        }
        return ResponseEntity.ok(results);
    }

    /** ✅ Upload timetable */
    @PostMapping("/{mentorId}/timetable")
    public ResponseEntity<?> uploadTimetable(
            @PathVariable Long mentorId,
            @RequestParam("file") MultipartFile file) {
        try {
            Timetable saved = timetableService.saveOrUpdateTimetable(mentorId, file);

            // Return metadata DTO instead of raw image bytes
            Map<String, Object> response = new LinkedHashMap<>();
            response.put("mentorId", mentorId);
            response.put("contentType", saved.getContentType());
            response.put("message", "✅ Timetable uploaded successfully!");

            return ResponseEntity.ok(response);
        } catch (Exception e) {
            return ResponseEntity.status(500).body("🔥 Error: " + e.getMessage());
        }
    }

    /** ✅ Download timetable (returns raw image) */
    @GetMapping("/{mentorId}/timetable")
    public ResponseEntity<byte[]> getTimetable(@PathVariable Long mentorId) {
        try {
            Timetable timetable = timetableService.getTimetableByMentor(mentorId);

            return ResponseEntity.ok()
                    .header(HttpHeaders.CONTENT_DISPOSITION,
                            "inline; filename=\"timetable_" + mentorId + "\"")
                    .contentType(MediaType.parseMediaType(timetable.getContentType()))
                    .body(timetable.getImageData());
        } catch (Exception e) {
            return ResponseEntity.status(404).body(null);
        }
    }
    @GetMapping("/{mentorId}")
    public ResponseEntity<?> getMentorById(@PathVariable Long mentorId) {
        try {
            // Using the service layer method
            MentorDTO mentorDTO = mentorQueryService.getMentorByMentorId(mentorId);
            return ResponseEntity.ok(mentorDTO);
        } catch (RuntimeException e) {
            // Return the mentorId along with error for debugging
            Map<String, Object> errorResponse = new LinkedHashMap<>();
            errorResponse.put("error", e.getMessage());
            errorResponse.put("mentorId", mentorId);
            return ResponseEntity.status(404).body(errorResponse);
        } catch (Exception e) {
            return ResponseEntity.status(500).body("Internal server error: " + e.getMessage());
        }
    }

    /** ✅ Simple health check endpoint */
    @GetMapping("/health")
    public ResponseEntity<String> healthCheck() {
        return ResponseEntity.ok("✅ Mentor API is working!");
    }
}
