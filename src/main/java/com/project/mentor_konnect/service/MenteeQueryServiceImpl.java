package com.project.mentor_konnect.service;

import com.project.mentor_konnect.DTO.MenteeDTO;
import com.project.mentor_konnect.repo.MenteeRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class MenteeQueryServiceImpl implements MenteeQueryService {

    private final MenteeRepository menteeRepository;

    @Override
    public List<MenteeDTO> getFullMenteesByMentorId(Long mentorId) {
        return menteeRepository.findAllByMentor_Id(mentorId)
                .stream()
                .map(m -> MenteeDTO.builder()
                        .id(m.getId())
                        .name(m.getName())
                        .rollNumber(m.getRollNumber())
                        .address(m.getAddress())
                        .parentName(m.getParentName())
                        .parentContact(m.getParentContact())
                        .contactNumber(m.getContactNumber())
                        .department(m.getDepartment())
                        .semester(m.getSemester())
                        .hostelDetails(m.getHostelDetails())
                        .cgpa(m.getCgpa())
                        .email(m.getUser() != null ? m.getUser().getEmail() : null)
                        .build())
                .collect(Collectors.toList());
    }
}
