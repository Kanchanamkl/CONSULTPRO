package com.consultpro.app.dto;

import com.consultpro.app.enums.ROLE;
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
    private String phoneNumber;
    private String address;
    private String gender;
    private String nic;
    private LocalDate dob;
    private String profilePic;
    private String specialize;
}