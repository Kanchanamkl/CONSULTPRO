package com.consultpro.app.service;

import com.consultpro.app.dto.AppointmentDTO;
import com.consultpro.app.entity.Appointment;
import com.consultpro.app.entity.Client;
import com.consultpro.app.entity.Counselor;
import com.consultpro.app.repository.AppointmentRepository;
import com.consultpro.app.exception.AppointmentNotFoundException;
import com.consultpro.app.repository.CounselorRepository;
import com.consultpro.app.repository.ClientRepository;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class AppointmentService {

    private final AppointmentRepository appointmentRepository;
    private final CounselorRepository counselorRepository;
    private final ClientRepository clientRepository;
    private final UserService userService;


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
        return appointment;
    }

    public Appointment getAppointmentById(Long id) {
        return appointmentRepository.findById(id)
                .orElseThrow(() -> new AppointmentNotFoundException("appointment not found with id: " + id));
    }

    public List<Appointment> getAppointmentsByClientId(Long memberId) {
        return appointmentRepository.findAllByClientId(memberId);
    }

    public List<Appointment> getAppointmentsByCounselorId(Long counselorId) {
        return appointmentRepository.findAllByCounselorId(counselorId);
    }

    public List<Appointment> getAllAppointments() {
        return appointmentRepository.findAll();
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


}