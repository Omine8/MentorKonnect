package com.project.mentor_konnect.repo;

import com.project.mentor_konnect.model.LeaveRequest;
import com.project.mentor_konnect.model.Mentee;
import com.project.mentor_konnect.model.Mentor;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface LeaveRequestRepository extends JpaRepository<LeaveRequest, Long> {

    List<LeaveRequest> findByMentee(Mentee mentee);
    List<LeaveRequest> findByMentor(Mentor mentor);
    List<LeaveRequest> findByStatus(LeaveRequest.LeaveRequestStatus status);
}