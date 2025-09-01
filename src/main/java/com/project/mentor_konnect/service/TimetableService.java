package com.project.mentor_konnect.service;

import com.project.mentor_konnect.model.Mentor;
import com.project.mentor_konnect.model.Timetable;
import com.project.mentor_konnect.repo.MentorRepository;
import com.project.mentor_konnect.repo.TimetableRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j; // ✅ add this
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;

@Service
@RequiredArgsConstructor
@Slf4j
public class TimetableService {

    private final TimetableRepository timetableRepository;
    private final MentorRepository mentorRepository;

    // Upload or update timetable for a specific mentor
    public Timetable saveOrUpdateTimetable(Long mentorId, MultipartFile file) throws IOException {
        Mentor mentor = mentorRepository.findById(mentorId)
                .orElseThrow(() -> new RuntimeException("Mentor not found with id: " + mentorId));

        // Validate allowed file types (jpg, jpeg, png)
        String contentType = file.getContentType();
        if (contentType == null ||
                !(contentType.equalsIgnoreCase("image/jpeg") ||
                        contentType.equalsIgnoreCase("image/jpg") ||
                        contentType.equalsIgnoreCase("image/png"))) {
            throw new RuntimeException("Only JPG, JPEG, and PNG images are allowed.");
        }

        // If timetable exists → update it, else create new
        Timetable timetable = timetableRepository.findByMentor_Id(mentorId)
                .orElse(Timetable.builder()
                        .mentor(mentor)
                        .build());

        timetable.setImageData(file.getBytes());
        timetable.setContentType(contentType);

        Timetable saved = timetableRepository.save(timetable);

        log.info("📅 Timetable uploaded/updated for Mentor ID {} (type: {}, size: {} KB)",
                mentorId, contentType, file.getSize() / 1024);

        return saved;
    }

    // Get timetable by mentor
    public Timetable getTimetableByMentor(Long mentorId) {
        return timetableRepository.findByMentor_Id(mentorId)
                .orElseThrow(() -> new RuntimeException("Timetable not found for mentor with id: " + mentorId));
    }
}