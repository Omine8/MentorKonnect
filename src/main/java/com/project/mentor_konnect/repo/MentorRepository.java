package com.project.mentor_konnect.repo;

import com.project.mentor_konnect.model.Mentor;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface MentorRepository extends JpaRepository<Mentor, Long> {
    Optional<Mentor> findByUser_Email(String email);
    Optional<Mentor> findByUserId(Long userId);
}
