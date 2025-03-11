package com.consultpro.app.dto;

import com.consultpro.app.enums.ROLE;
import com.consultpro.app.enums.USER_STATUS;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;

/**
 * Author: Kanchana Kalansooriya
 * Since: 8/13/2024
 */
@Builder
@Data
@AllArgsConstructor
@NoArgsConstructor
public class UserDTO {

    private String firstName;
    private String lastName;
    private String username;
    private String password;
    private ROLE role;
    private USER_STATUS status;
    private String phoneNumber;
    private String address;
    private String city;
    private String gender;
    private LocalDate dob;
    private String profilePic;

    private String nic;
    private String specialize;
    private boolean isPsychologist;
    private String profileImage;
    private String degreeTranscript;
    private String medicalQualification;
    private String experienceDescription;
}