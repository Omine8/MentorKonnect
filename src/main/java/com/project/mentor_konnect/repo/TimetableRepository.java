package com.project.mentor_konnect.repo;

import com.project.mentor_konnect.model.Timetable;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface TimetableRepository extends JpaRepository<Timetable, Long> {
    Optional<Timetable> findByMentor_Id(Long mentorId); // ✅ correct with shared PK
}
