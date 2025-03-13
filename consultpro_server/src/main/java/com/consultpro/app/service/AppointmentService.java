package com.consultpro.app.service;

import com.consultpro.app.controller.WebSocketController;
import com.consultpro.app.dto.AppointmentDTO;
import com.consultpro.app.dto.AppointmentResponseDTO;
import com.consultpro.app.entity.Appointment;
import com.consultpro.app.entity.Client;
import com.consultpro.app.entity.Counselor;
import com.consultpro.app.exception.UserNotFoundException;
import com.consultpro.app.repository.AppointmentRepository;
import com.consultpro.app.exception.AppointmentNotFoundException;
import com.consultpro.app.repository.CounselorRepository;
import com.consultpro.app.repository.ClientRepository;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class AppointmentService {

    private final AppointmentRepository appointmentRepository;
    private final CounselorRepository counselorRepository;
    private final ClientRepository clientRepository;
    private final UserService userService;
    private final WebSocketController webSocketController;


    @Transactional
    public Appointment createAppointment(AppointmentDTO appointmentDTO) {
        Counselor counselor = counselorRepository.findById(appointmentDTO.getCounselorId())
                .orElseThrow(() -> new AppointmentNotFoundException("counselor not found with id: " + appointmentDTO.getCounselorId()));

        Client client = clientRepository.findByUser(userService.getUserById(appointmentDTO.getClientId()))
                .orElseThrow(() -> new AppointmentNotFoundException("client not found with id: " + appointmentDTO.getClientId()));



        Appointment appointment = Appointment.builder()
                .counselor(counselor)
                .client(client)
                .date(appointmentDTO.getDate())
                .startTime(appointmentDTO.getStartTime())
                .endTime(appointmentDTO.getEndTime())
                .description(appointmentDTO.getDescription())
                .build();

        appointment = appointmentRepository.save(appointment);
        webSocketController.sendAppointmentUpdate(appointment.getCounselor().getId(),appointment.getClient().getId());  // Notify the counselor
        return appointment;
    }

    public Appointment getAppointmentById(Long id) {
        return appointmentRepository.findById(id)
                .orElseThrow(() -> new AppointmentNotFoundException("appointment not found with id: " + id));
    }

    public List<AppointmentResponseDTO> getAppointmentsByClientId(Long clientId) {
        List<Appointment> appointments = appointmentRepository.findAllByClientId(clientId);
        return appointments.stream().map(appointment -> {
            String timeSlot = appointment.getStartTime().toString() + " - " + appointment.getEndTime().toString();
            return AppointmentResponseDTO.builder()
                    .id(appointment.getId())
                    .counselorName(appointment.getCounselor().getFirstName() + " " + appointment.getCounselor().getLastName())
                    .counselorImg(appointment.getCounselor().getProfilePic())
                    .clientName(appointment.getClient().getFirstName() + " " + appointment.getClient().getLastName())
                    .clientImg(appointment.getClient().getProfilePic())
                    .date(appointment.getDate().toString())
                    .timeSlot(timeSlot)
                    .startTime(appointment.getStartTime().toString())
                    .endTime(appointment.getEndTime().toString())
                    .build();
        }).collect(Collectors.toList());
    }


    public List<AppointmentResponseDTO> getAppointmentsByCounselorId(Long counselorId) {
        List<Appointment> appointments = appointmentRepository.findAllByCounselorId(counselorId);
        return appointments.stream().map(appointment -> {
            String timeSlot = appointment.getStartTime().toString() + " - " + appointment.getEndTime().toString();
            return AppointmentResponseDTO.builder()
                    .id(appointment.getId())
                    .counselorName(appointment.getCounselor().getFirstName() + " " + appointment.getCounselor().getLastName())
                    .counselorImg(appointment.getCounselor().getProfilePic())
                    .clientName(appointment.getClient().getFirstName() + " " + appointment.getClient().getLastName())
                    .clientImg(appointment.getClient().getProfilePic())
                    .date(appointment.getDate().toString())
                    .timeSlot(timeSlot)
                    .startTime(appointment.getStartTime().toString())
                    .endTime(appointment.getEndTime().toString())
                    .build();
        }).collect(Collectors.toList());
    }

    public List<AppointmentResponseDTO> getAllAppointments() {
        List<Appointment> appointments = appointmentRepository.findAll();
        return appointments.stream().map(appointment -> {
            String timeSlot = appointment.getStartTime().toString() + " - " + appointment.getEndTime().toString();
            return AppointmentResponseDTO.builder()
                    .id(appointment.getId())
                    .counselorName(appointment.getCounselor().getFirstName() + " " + appointment.getCounselor().getLastName())
                    .counselorImg(appointment.getCounselor().getProfilePic())
                    .clientName(appointment.getClient().getFirstName() + " " + appointment.getClient().getLastName())
                    .clientImg(appointment.getClient().getProfilePic())
                    .date(appointment.getDate().toString())
                    .timeSlot(timeSlot)
                    .startTime(appointment.getStartTime().toString())
                    .endTime(appointment.getEndTime().toString())
                    .build();
        }).collect(Collectors.toList());
    }

    @Transactional
    public Appointment updateAppointment(Long id, AppointmentDTO appointmentDTO) {
        Appointment existingAppointment = appointmentRepository.findById(id)
                .orElseThrow(() -> new AppointmentNotFoundException("appointment not found with id: " + id));

        Counselor counselor = counselorRepository.findById(appointmentDTO.getCounselorId())
                .orElseThrow(() -> new AppointmentNotFoundException("Counselor not found with id: " + appointmentDTO.getCounselorId()));

        Client client = clientRepository.findById(appointmentDTO.getClientId())
                .orElseThrow(() -> new AppointmentNotFoundException("Client not found with id: " + appointmentDTO.getClientId()));

        existingAppointment.setCounselor(counselor);
        existingAppointment.setClient(client);
        existingAppointment.setDate(appointmentDTO.getDate());
        existingAppointment.setStartTime(appointmentDTO.getStartTime());
        existingAppointment.setEndTime(appointmentDTO.getEndTime());
        existingAppointment.setDescription(appointmentDTO.getDescription());

        return appointmentRepository.save(existingAppointment);
    }

    @Transactional
    public void deleteAppointment(Long id) {
        if (!appointmentRepository.existsById(id)) {
            throw new AppointmentNotFoundException("appointment not found with id: " + id);
        }
        appointmentRepository.deleteById(id);
    }

    public List<String> getAppointmentsSlotsByDateAndCounselorID(LocalDate date , Long counselorId) {
        Counselor counselor = counselorRepository.findById(counselorId)
                .orElseThrow(() -> new UserNotFoundException("Counselor not found with id: " +counselorId));
        List<Appointment> appointments = appointmentRepository.findAppointmentsByDateAndCounselor(date, counselor);
        List<String> slots = new ArrayList<>();
        for (Appointment appointment : appointments) {
            String slot = appointment.getStartTime().toString() + " - " + appointment.getEndTime().toString();
            slots.add(slot);
        }
        return slots;
    }


}