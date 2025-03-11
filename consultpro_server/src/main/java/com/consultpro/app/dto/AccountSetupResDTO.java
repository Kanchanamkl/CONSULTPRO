package com.consultpro.app.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

/**
 * @author : Kanchana Kalansooriya
 * @since 1/14/2025
 */
@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class AccountSetupResDTO {
    private String Id;
    private String username;
    private String role;
    private String firstName;
    private String lastName;
    private String profilePic;
    private String message;
    private String userStatus;
    private String email;
}
