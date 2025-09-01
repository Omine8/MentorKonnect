package com.project.mentor_konnect.model;

import jakarta.persistence.*;
import lombok.*;
import java.time.LocalDateTime;
import java.util.List;

@Entity
@Table(name = "mentor")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Mentor {

    @Id
    private Long id; // ✅ same as user.id

    @OneToOne
    @MapsId   // ✅ use same PK as user
    @JoinColumn(name = "id") // PK = FK
    private User user;

    private String name;
    private String department;
    private String designation;
    private String contactNumber;
    private String consultationHours;
    private String officeLocation;
    private String generalInfo;

    @OneToMany(mappedBy = "mentor", cascade = CascadeType.ALL)
    private List<Mentee> mentees;

    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;
}
