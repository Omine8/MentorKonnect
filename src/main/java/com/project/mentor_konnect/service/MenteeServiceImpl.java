package com.project.mentor_konnect.service;

import com.project.mentor_konnect.DTO.MenteeDTO;
import com.project.mentor_konnect.model.Mentee;
import com.project.mentor_konnect.repo.MenteeRepository;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class MenteeServiceImpl implements MenteeService {

    private final MenteeRepository menteeRepository;

    public MenteeServiceImpl(MenteeRepository menteeRepository) {
        this.menteeRepository = menteeRepository;
    }

    @Override
    public Mentee createOrUpdate(Mentee mentee) {
        return menteeRepository.save(mentee);
    }

    @Override
    public Optional<Mentee> findById(Long id) {
        return menteeRepository.findById(id);
    }

    @Override
    public Optional<Mentee> findByEmail(String email) {
        return menteeRepository.findByUser_Email(email);
    }

    @Override
    public List<Mentee> findByMentorId(Long mentorId) {
        return menteeRepository.findAllByMentor_Id(mentorId);
    }

    public List<MenteeDTO> getMenteesByMentor(Long mentorId) {
        return menteeRepository.findAllByMentor_Id(mentorId)
                .stream()
                .map(m -> new MenteeDTO(
                        m.getId(),
                        m.getName(),
                        m.getUser().getEmail() // ✅ fetch email from linked User
                ))
                .toList();
    }

    @Override
    public Long getAssignedMentorId(Long menteeId) {
        return menteeRepository.findById(menteeId)
                .map(mentee -> {
                    Long mentorId = mentee.getMentor().getId();
                    System.out.println("✅ Found MentorId: " + mentorId + " for MenteeId: " + menteeId);
                    return mentorId;
                })
                .orElseThrow(() -> {
                    System.err.println("❌ Mentee or Mentor not found for MenteeId: " + menteeId);
                    return new RuntimeException("Mentee or Mentor not found for MenteeId " + menteeId);
                });
    }

    // 🔹 Get a single mentee’s full details by menteeId
    public MenteeDTO getMenteeDetailsById(Long menteeId) {
        return menteeRepository.findById(menteeId)
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
                            .build()
                    )
                    .orElseThrow(() -> new RuntimeException("No mentee found with ID: " + menteeId));
    }
}






