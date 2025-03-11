package com.consultpro.app.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;
import java.time.LocalTime;


/**
 * @author : Kanchana Kalansooriya
 * @since 11/13/2024
 */

@Data
@AllArgsConstructor
@NoArgsConstructor
public class AppointmentDTO {

    private Long id;
    private Long counselorId;
    private Long clientId;
    private LocalDate date;
    private LocalTime startTime;
    private LocalTime endTime;
    private String description;

}

