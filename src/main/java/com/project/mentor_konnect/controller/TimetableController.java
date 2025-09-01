package com.project.mentor_konnect.controller;

import com.project.mentor_konnect.model.Timetable;
import com.project.mentor_konnect.repo.TimetableRepository;
import com.project.mentor_konnect.service.TimetableService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;


@RestController
@RequestMapping("/api/timetables")
@RequiredArgsConstructor
public class TimetableController {
    private final TimetableRepository timetableRepository;
    private final TimetableService timetableService;

    @GetMapping("/mentor/{mentorId}")
    public ResponseEntity<byte[]> getTimetable(@PathVariable Long mentorId) {
        try {
            // Fetch timetable via service layer
            Timetable timetable = timetableService.getTimetableByMentor(mentorId);

            if (timetable == null || timetable.getImageData() == null) {
                return ResponseEntity.notFound().build();
            }

            return ResponseEntity.ok()
                    .header(HttpHeaders.CONTENT_DISPOSITION,
                            "inline; filename=\"timetable_" + mentorId + "\"")
                    .contentType(MediaType.parseMediaType(timetable.getContentType()))
                    .body(timetable.getImageData());
        } catch (Exception e) {
            return ResponseEntity.status(404).body(null);
        }
    }
}