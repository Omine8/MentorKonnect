package com.project.mentor_konnect.DTO;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.math.BigDecimal;

/**
 * Data Transfer Object for Mentee
 */
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder  // Add this annotation for the builder pattern
public class MenteeDTO {
    private Long id;
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
    private String email;


// Constructor for email sending (only id, name, and email)
    public MenteeDTO(Long id, String name, String email) {
        this.id = id;
        this.name = name;
        this.email = email;
    }

    // Constructor for full details (id, name, email, etc.)
    public MenteeDTO(Long id, String name, String email, String rollNumber, String address,
                     String parentName, String parentContact, String contactNumber, String department,
                     Integer semester, String hostelDetails, BigDecimal cgpa) {
        this.id = id;
        this.name = name;
        this.email = email;
        this.rollNumber = rollNumber;
        this.address = address;
        this.parentName = parentName;
        this.parentContact = parentContact;
        this.contactNumber = contactNumber;
        this.department = department;
        this.semester = semester;
        this.hostelDetails = hostelDetails;
        this.cgpa = cgpa;
    }
}
