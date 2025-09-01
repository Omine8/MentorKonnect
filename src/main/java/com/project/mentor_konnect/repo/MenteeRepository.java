package com.project.mentor_konnect.repo;

import com.project.mentor_konnect.model.Mentee;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface MenteeRepository extends JpaRepository<Mentee, Long> {
    Optional<Mentee> findByUser_Email(String email);

    // ✅ Method 1 - explicit navigation
    List<Mentee> findAllByMentor_Id(Long mentorId);

    // ✅ Method 2 - shorter version
    List<Mentee> findByMentorId(Long mentorId);

    Optional<Mentee> findByUserId(Long userId);
}
