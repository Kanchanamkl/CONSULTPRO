package com.consultpro.app.repository;

import com.consultpro.app.entity.Appointment;
import com.consultpro.app.entity.Counselor;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.time.LocalDate;
import java.util.List;

@Repository
public interface AppointmentRepository extends JpaRepository<Appointment, Long> {

    List<Appointment> findAllByClientId(Long clientId);
    List<Appointment> findAllByCounselorId(Long counselorId);
    List<Appointment> findAppointmentsByDateAndCounselor(LocalDate localDate, Counselor counselor);
    void deleteByCounselorId(Long counselorId);
    void deleteByClientId(Long clientId);
}