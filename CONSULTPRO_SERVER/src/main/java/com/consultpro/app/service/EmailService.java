package com.consultpro.app.service;

/**
 * @author : Kanchana Kalansooriya
 * @since 1/13/2025
 */

import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Service;

import java.util.Date;
import java.util.HashMap;
import java.util.Map;

@Service
public class EmailService {

    @Autowired
    private JavaMailSender mailSender;

    private final String jwtSecret = "your-secret-key";
    private final long jwtExpirationMs = 3600000; // 1 hour

    public void sendAccountSetupEmail(String toEmail, String userId) {
        String token = generateJwtToken(userId);
        String setupUrl = "https://yourapp.com/setup-account?token=" + token;

        SimpleMailMessage message = new SimpleMailMessage();
        message.setTo(toEmail);
        message.setSubject("Set Up Your Account");
        message.setText("Please click the following link to set up your account: " + setupUrl);

        mailSender.send(message);
    }

    private String generateJwtToken(String userId) {
        Map<String, Object> claims = new HashMap<>();
        claims.put("userId", userId);

        return Jwts.builder()
                .setClaims(claims)
                .setSubject(userId)
                .setIssuedAt(new Date())
                .setExpiration(new Date((new Date()).getTime() + jwtExpirationMs))
                .signWith(SignatureAlgorithm.HS512, jwtSecret)
                .compact();
    }
}