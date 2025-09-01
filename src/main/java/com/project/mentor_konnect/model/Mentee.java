package com.project.mentor_konnect.model;

import jakarta.persistence.*;
import lombok.*;
import java.math.BigDecimal;
import java.time.LocalDateTime;

@Entity
@Table(name = "mentee")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Mentee {

    @Id
    private Long id; // ✅ same as user.id

    @OneToOne
    @MapsId   // ✅ use same PK as user
    @JoinColumn(name = "id") // PK = FK
    private User user;

    private String name;
    private String rollNumber;
    private String address;
    private String parentName;
    private String parentContact;
    private String contactNumber;
    private String department;
    private Integer semester;
    private String hostelDetails;
    private BigDecimal cgpa;

    @ManyToOne
    @JoinColumn(name = "mentor_id", nullable = false)
    private Mentor mentor; // assigned mentor

    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;
}
