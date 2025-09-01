package com.project.mentor_konnect.controller;

import com.project.mentor_konnect.DTO.LoginResponse;
import com.project.mentor_konnect.model.Mentee;
import com.project.mentor_konnect.model.Mentor;
import com.project.mentor_konnect.model.User;
import com.project.mentor_konnect.repo.MenteeRepository;
import com.project.mentor_konnect.repo.MentorRepository;
import com.project.mentor_konnect.repo.UserRepository;
import com.project.mentor_konnect.service.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/auth")
@RequiredArgsConstructor
public class AuthController {

    private final UserService userService;
    private final MentorRepository mentorRepo;
    private final MenteeRepository menteeRepo;
    private final UserRepository userRepo;

    @PostMapping("/mentor/signup")
    public User registerMentor(@RequestBody User user) {
        user.setUserType(User.UserType.MENTOR);
        return userService.signup(user);
    }

    @PostMapping("/student/signup")
    public User registerStudent(@RequestBody User user) {
        user.setUserType(User.UserType.MENTEE);
        return userService.signup(user);
    }

    @PostMapping("/login")
    public LoginResponse login(@RequestBody User loginReq) {
        User user = userRepo.findByEmail(loginReq.getEmail())
                .filter(u -> u.getPassword().equals(loginReq.getPassword()))
                .orElseThrow(() -> new RuntimeException("Invalid credentials"));

        LoginResponse resp = new LoginResponse();
        resp.setId(user.getId()); // USERS table id
        resp.setEmail(user.getEmail());
        resp.setUserType(user.getUserType().name());

        if (user.getUserType() == User.UserType.MENTEE) {
            Mentee mentee = menteeRepo.findByUserId(user.getId())
                    .orElseThrow(() -> new RuntimeException("Mentee not found"));
            resp.setMenteeId(mentee.getId());
            if (mentee.getMentor() != null) {
                resp.setMentorId(mentee.getMentor().getId()); // assigned mentor id (201)
            }
        } else if (user.getUserType() == User.UserType.MENTOR) {
            Mentor mentor = mentorRepo.findByUserId(user.getId())
                    .orElseThrow(() -> new RuntimeException("Mentor not found"));
            resp.setMentorId(mentor.getId()); // mentorId
        }

        return resp;
    }
}
