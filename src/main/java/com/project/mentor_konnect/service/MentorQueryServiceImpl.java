package com.project.mentor_konnect.service;

import com.project.mentor_konnect.DTO.MenteeDTO;
import com.project.mentor_konnect.DTO.MentorDTO;
import com.project.mentor_konnect.model.Mentee;
import com.project.mentor_konnect.model.Mentor;
import com.project.mentor_konnect.repo.MenteeRepository;
import com.project.mentor_konnect.repo.MentorRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class MentorQueryServiceImpl implements MentorQueryService {

    private final MenteeRepository menteeRepository;
    private final MentorRepository mentorRepository;

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

    @Override
    public MentorDTO getMentorByMenteeId(Long menteeId) {
        Mentee mentee = menteeRepository.findById(menteeId)
                .orElseThrow(() -> new RuntimeException("Mentee not found with id " + menteeId));

        Mentor mentor = mentee.getMentor();
        if (mentor == null) {
            throw new RuntimeException("No mentor assigned to mentee " + menteeId);
        }

        return MentorDTO.builder()
                .id(mentor.getId())
                .name(mentor.getName())
                .department(mentor.getDepartment())
                .designation(mentor.getDesignation())
                .contactNumber(mentor.getContactNumber())
                .consultationHours(mentor.getConsultationHours())
                .officeLocation(mentor.getOfficeLocation())
                .generalInfo(mentor.getGeneralInfo())
                .email(mentor.getUser() != null ? mentor.getUser().getEmail() : null)
                .build();
    }

    @Override
    public MentorDTO getMentorByMentorId(Long mentorId) {
        Mentor mentor = mentorRepository.findById(mentorId)
                .orElseThrow(() -> new RuntimeException("Mentor not found with id " + mentorId));

        return MentorDTO.builder()
                .id(mentor.getId())
                .name(mentor.getName())
                .department(mentor.getDepartment())
                .designation(mentor.getDesignation())
                .contactNumber(mentor.getContactNumber())
                .consultationHours(mentor.getConsultationHours())
                .officeLocation(mentor.getOfficeLocation())
                .generalInfo(mentor.getGeneralInfo())
                .email(mentor.getUser() != null ? mentor.getUser().getEmail() : null)
                .build();
    }

}
