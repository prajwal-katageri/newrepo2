package com.hospital.opd.service;

import com.hospital.opd.models.Appointment;
import java.util.List;
import java.util.Optional;

/**
 * Appointment Service Interface
 * Defines business logic for Appointment management
 */
public interface AppointmentService {
    
    Appointment bookAppointment(Appointment appointment);
    
    List<Appointment> getAppointments();
    
    List<Appointment> getAppointmentsByPatientId(String patientId);
    
    List<Appointment> getAppointmentsByDoctorId(String doctorId);
    
    List<Appointment> getAppointmentsByStatus(String status);
    
    Optional<Appointment> getAppointmentById(String id);
    
    Appointment completeAppointment(String id);
    
    Appointment cancelAppointment(String id);
    
    void deleteAppointment(String id);
}
