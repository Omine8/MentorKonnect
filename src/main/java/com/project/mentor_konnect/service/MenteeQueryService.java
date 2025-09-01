package com.project.mentor_konnect.service;

import com.project.mentor_konnect.DTO.MenteeDTO;
import java.util.List;

public interface MenteeQueryService {
    // Method for detailed mentee information
    List<MenteeDTO> getFullMenteesByMentorId(Long mentorId);
}
