package com.consultpro.app.controller;

import com.consultpro.app.dto.AppointmentResponseDTO;
import com.consultpro.app.entity.Appointment;
import com.consultpro.app.entity.Client;
import com.consultpro.app.entity.Counselor;
import com.consultpro.app.service.UserService;
import com.consultpro.app.dto.AppointmentDTO;
import com.consultpro.app.repository.ClientRepository;
import com.consultpro.app.repository.CounselorRepository;
import com.consultpro.app.service.AppointmentService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;
@RestController
@CrossOrigin(origins = "*")
@RequestMapping("/api/appointments")
@RequiredArgsConstructor
public class AppointmentController {

    private final AppointmentService appointmentService;
    private final UserService userService;
    private final ClientRepository clientRepository;
    private final CounselorRepository counselorRepository;

    @PostMapping("/create")
    public ResponseEntity<Appointment> createAppointment(@RequestBody AppointmentDTO appointmentDTO) {
        Appointment createdCoachBooking = appointmentService.createAppointment(appointmentDTO);
        return ResponseEntity.ok(createdCoachBooking);
    }

    @GetMapping("/{id}")
    public ResponseEntity<Appointment> getAppointmentById(@PathVariable Long id) {
        Appointment appointment = appointmentService.getAppointmentById(id);
        return ResponseEntity.ok(appointment);
    }

    @GetMapping("/get_all_appointments")
    public List<AppointmentResponseDTO> getAllAppointments() {
        return  appointmentService.getAllAppointments();
    }

    @GetMapping("/get_appointments_by_clientId")
    public List<AppointmentResponseDTO> getAppointmentsByClientId(@RequestParam Long userId) {
        Optional<Client> client = clientRepository.findByUser(userService.getUserById(userId));
        List<AppointmentResponseDTO> appointments = appointmentService.getAppointmentsByClientId(client.get().getId());
        return appointments;

    }

    @GetMapping("/get_appointments_by_counselorId")
    public List<AppointmentResponseDTO> getAppointmentsByCounselorId(@RequestParam Long userId) {
        Optional<Counselor> counselor = counselorRepository.findByUser(userService.getUserById(userId));
        List<AppointmentResponseDTO> appointments = appointmentService.getAppointmentsByCounselorId(counselor.get().getId());
        return appointments;

    }




    @PutMapping("/{id}")
    public ResponseEntity<Appointment> updateAppointment(@PathVariable Long id, @RequestBody AppointmentDTO appointmentDTO) {
        Appointment updateAppointment = appointmentService.updateAppointment(id, appointmentDTO);
        return ResponseEntity.ok(updateAppointment);
    }

    @DeleteMapping("")
    public ResponseEntity<Void> deleteAppointment(@RequestParam Long id) {
        appointmentService.deleteAppointment(id);
        return ResponseEntity.noContent().build();
    }

    @GetMapping("/get_appointment_slots_by_date_and_counselorId")
    public List<String> getAppointmentSlotsByDateAndCounselorId(@RequestParam LocalDate appointmentDate, @RequestParam Long counselorId) {
        List<String> appointmentsSlotsByDateAndCounselorID = appointmentService.getAppointmentsSlotsByDateAndCounselorID(appointmentDate,counselorId);
        return appointmentsSlotsByDateAndCounselorID;

    }



}