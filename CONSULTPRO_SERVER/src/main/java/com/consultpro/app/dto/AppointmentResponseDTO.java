package com.consultpro.app.dto;
import lombok.Builder;
import lombok.Data;
/**
 * @author : Kanchana Kalansooriya
 * @since 1/28/2025
 */


@Data
@Builder
public class AppointmentResponseDTO {
    private Long id;
    private String counselorName;
    private String counselorImg;
    private String clientName;
    private String clientImg;
    private String date;
    private String time;
    private String status;
}