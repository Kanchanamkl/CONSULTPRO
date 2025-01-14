package com.consultpro.app.dto;

/**
 * @author : Kanchana Kalansooriya
 * @since 1/14/2025
 */


import lombok.Builder;
import lombok.Data;

import java.time.LocalDate;

@Data
@Builder
public class InactiveCounselorDTO {
    private Long id;
    private String firstName;
    private String lastName;
    private String username;
    private LocalDate dob;
    private String address;
    private String city;
    private String district;
    private String specialization;
    private String contact;
    private boolean isPsychiatrist;
    private String medicalQualification;
    private String profileImg;
    private String nic;
    private String degreeTranscript;
    private String experience;
    private String signature;
}