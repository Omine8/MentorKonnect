package com.project.mentor_konnect.DTO;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class MailDTO {
    private String subject;
    private String message;
    private List<String> recipients;
}
