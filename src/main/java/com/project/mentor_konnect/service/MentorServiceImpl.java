package com.project.mentor_konnect.service;

import com.project.mentor_konnect.model.Mentee;
import com.project.mentor_konnect.model.Mentor;
import com.project.mentor_konnect.repo.MenteeRepository;
import com.project.mentor_konnect.repo.MentorRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class MentorServiceImpl implements MentorService {

    private final MentorRepository mentorRepository;
    private final MenteeRepository menteeRepository;
    private final MailService mailService;

    public MentorServiceImpl(MentorRepository mentorRepository,
                             MenteeRepository menteeRepository,
                             MailService mailService) {
        this.mentorRepository = mentorRepository;
        this.menteeRepository = menteeRepository;
        this.mailService = mailService;
    }

    @Override
    public Mentor createOrUpdate(Mentor mentor) {
        return mentorRepository.save(mentor);
    }

    @Override
    public Optional<Mentor> findById(Long id) {
        return mentorRepository.findById(id);
    }

    @Override
    public Optional<Mentor> findByEmail(String email) {
        return mentorRepository.findByUser_Email(email);
    }

    @Override
    public List<Mentor> findAll() {
        return mentorRepository.findAll();
    }

    @Override
    @Transactional
    public void emailAllMentees(Long mentorId, String subject, String body) {
        List<Mentee> mentees = menteeRepository.findAllByMentor_Id(mentorId);
        List<String> emails = mentees.stream()
                .map(m -> m.getUser() != null ? m.getUser().getEmail() : null)
                .filter(e -> e != null)
                .collect(Collectors.toList());

        if (!emails.isEmpty()) {
            mailService.sendBulkEmail(emails, subject, body);
        }
    }

    public List<Mentee> getMenteesForLoggedInMentor(String email) {
        Mentor mentor = mentorRepository.findByUser_Email(email)
                .orElseThrow(() -> new RuntimeException("Mentor not found for email: " + email));

        return menteeRepository.findAllByMentor_Id(mentor.getId());
    }
    @Override
    public List<Mentee> getMenteesByMentorId(Long mentorId) {
        // Optional: check if mentor exists
        if (!mentorRepository.existsById(mentorId)) {
            throw new RuntimeException("Mentor not found with ID: " + mentorId);
        }
        return menteeRepository.findAllByMentor_Id(mentorId);
    }

}

