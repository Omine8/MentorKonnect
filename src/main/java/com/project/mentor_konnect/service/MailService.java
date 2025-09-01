package com.project.mentor_konnect.service;

import jakarta.mail.MessagingException;
import jakarta.mail.internet.MimeMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class MailService {

    private final JavaMailSender mailSender;

    public MailService(JavaMailSender mailSender) {
        this.mailSender = mailSender;
    }

    // ✅ Single email
    public void sendEmail(String to, String subject, String text) {
        try {
            MimeMessage mimeMessage = mailSender.createMimeMessage();
            MimeMessageHelper helper = new MimeMessageHelper(mimeMessage, false);

            helper.setTo(to);
            helper.setSubject(subject);
            helper.setText(text, false); // false = plain text, true = HTML
            helper.setFrom("noreply.mentorkonnect@gmail.com"); // must match spring.mail.username

            mailSender.send(mimeMessage);
            System.out.println("✅ Mail sent to: " + to);
        } catch (MessagingException e) {
            System.err.println("❌ Failed to send mail to " + to + ": " + e.getMessage());
            throw new RuntimeException(e);
        }
    }

    // ✅ Bulk email
    public void sendBulkEmail(List<String> toList, String subject, String text) {
        for (String email : toList) {
            sendEmail(email, subject, text);
        }
    }
}
