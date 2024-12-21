package com.consultpro.app.controller;

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

import java.util.List;
import java.util.Optional;

@RestController
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
    public List<Appointment> getAllAppointments() {
        return  appointmentService.getAllAppointments();
    }

    @GetMapping("/get_appointments_by_client/{userId}")
    public List<Appointment> getAppointmentsByClientId(@PathVariable Long userId) {
        Optional<Client> member = clientRepository.findByUser(userService.getUserById(userId));
        List<Appointment> appointments = appointmentService.getAppointmentsByClientId(member.get().getId());
        return appointments;

    }

    @GetMapping("/get_appointments_by_client/{userId}")
    public List<Appointment> getAppointmentsByCounselorId(@PathVariable Long userId) {
        Optional<Counselor> counselor = counselorRepository.findByUser(userService.getUserById(userId));
        List<Appointment> appointments = appointmentService.getAppointmentsByCounselorId(counselor.get().getId());
        return appointments;

    }




    @PutMapping("/{id}")
    public ResponseEntity<Appointment> updateAppointment(@PathVariable Long id, @RequestBody AppointmentDTO appointmentDTO) {
        Appointment updateAppointment = appointmentService.updateAppointment(id, appointmentDTO);
        return ResponseEntity.ok(updateAppointment);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteAppointment(@PathVariable Long id) {
        appointmentService.deleteAppointment(id);
        return ResponseEntity.noContent().build();
    }


}