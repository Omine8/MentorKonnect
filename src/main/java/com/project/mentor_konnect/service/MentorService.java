package com.project.mentor_konnect.service;

import com.project.mentor_konnect.model.Mentee;
import com.project.mentor_konnect.model.Mentor;

import java.util.List;
import java.util.Optional;

public interface MentorService {
    Mentor createOrUpdate(Mentor mentor);
    Optional<Mentor> findById(Long id);
    Optional<Mentor> findByEmail(String email);
    List<Mentor> findAll();
    void emailAllMentees(Long mentorId, String subject, String body);
    List<Mentee> getMenteesByMentorId(Long mentorId);
}
