package com.project.mentor_konnect.service;

import com.project.mentor_konnect.DTO.MenteeDTO;
import com.project.mentor_konnect.DTO.MentorDTO;

import java.util.List;

public interface MentorQueryService {

    List<MenteeDTO> getFullMenteesByMentorId(Long mentorId);

    MentorDTO getMentorByMenteeId(Long menteeId);
    MentorDTO getMentorByMentorId(Long menteeId);
}
