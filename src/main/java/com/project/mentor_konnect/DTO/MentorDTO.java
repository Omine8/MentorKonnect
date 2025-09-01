package com.project.mentor_konnect.DTO;

import lombok.*;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class MentorDTO {
    private Long id;
    private String name;
    private String department;
    private String designation;
    private String contactNumber;
    private String consultationHours;
    private String officeLocation;
    private String generalInfo;
    private String email;
}
