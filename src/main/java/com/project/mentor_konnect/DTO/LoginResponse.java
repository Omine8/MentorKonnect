package com.project.mentor_konnect.DTO;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@NoArgsConstructor
@AllArgsConstructor
@Data
public class LoginResponse {
    private Long id;         // userId
    private String email;
    private String userType;
    private Long menteeId;   // ✅ actual mentee table id
    private Long mentorId;   // if needed
}
