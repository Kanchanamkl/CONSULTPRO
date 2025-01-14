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
public class AccountSetupReqDTO {
    private String email;
    private String password;
}
