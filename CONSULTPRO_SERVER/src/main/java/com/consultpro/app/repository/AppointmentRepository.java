package com.consultpro.app.repository;

import com.consultpro.app.entity.Appointment;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface AppointmentRepository extends JpaRepository<Appointment, Long> {

    List<Appointment> findAllByClientId(Long memberId);
    List<Appointment> findAllByCounselorId(Long coachId);
    void deleteByCounselorId(Long counselorId);
    void deleteByClientId(Long clientId);
}