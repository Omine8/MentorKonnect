package com.project.mentor_konnect.service;

import com.project.mentor_konnect.DTO.MenteeDTO;
import com.project.mentor_konnect.model.Mentee;

import java.util.List;
import java.util.Optional;

public interface MenteeService {
    Mentee createOrUpdate(Mentee mentee);
    Optional<Mentee> findById(Long id);
    Optional<Mentee> findByEmail(String email);
    List<Mentee> findByMentorId(Long mentorId);
    List<MenteeDTO> getMenteesByMentor(Long mentorId);
    Long getAssignedMentorId(Long menteeId);
    MenteeDTO getMenteeDetailsById(Long mentorId);
}


