package com.hospital.opd.service.impl;

import com.hospital.opd.models.Appointment;
import com.hospital.opd.repository.AppointmentRepository;
import com.hospital.opd.service.AppointmentService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

/**
 * Appointment Service Implementation
 * Implements business logic for Appointment management
 */
@Service
public class AppointmentServiceImpl implements AppointmentService {

    @Autowired
    private AppointmentRepository appointmentRepository;

    @Override
    public Appointment bookAppointment(Appointment appointment) {
        if (appointment.getAppointmentTime() == null) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Appointment time is required");
        }
        if (appointment.getAppointmentTime().isBefore(LocalDateTime.now())) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Appointment time cannot be in the past");
        }
        appointment.setStatus("booked");
        return appointmentRepository.save(appointment);
    }

    @Override
    public List<Appointment> getAppointments() {
        return appointmentRepository.findAll();
    }

    @Override
    public List<Appointment> getAppointmentsByPatientId(String patientId) {
        return appointmentRepository.findByPatientId(patientId);
    }

    @Override
    public List<Appointment> getAppointmentsByDoctorId(String doctorId) {
        return appointmentRepository.findByDoctorId(doctorId);
    }

    @Override
    public List<Appointment> getAppointmentsByStatus(String status) {
        return appointmentRepository.findByStatus(status);
    }

    @Override
    public Optional<Appointment> getAppointmentById(String id) {
        return appointmentRepository.findById(id);
    }

    @Override
    public Appointment completeAppointment(String id) {
        Optional<Appointment> appointment = appointmentRepository.findById(id);
        if (appointment.isPresent()) {
            Appointment apt = appointment.get();
            apt.setStatus("completed");
            return appointmentRepository.save(apt);
        }
        return null;
    }

    @Override
    public Appointment cancelAppointment(String id) {
        Optional<Appointment> appointment = appointmentRepository.findById(id);
        if (appointment.isPresent()) {
            Appointment apt = appointment.get();
            apt.setStatus("cancelled");
            return appointmentRepository.save(apt);
        }
        return null;
    }

    @Override
    public void deleteAppointment(String id) {
        appointmentRepository.deleteById(id);
    }
}
