package com.hospital.opd.models;

import java.time.LocalDateTime;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

/**
 * Appointment Model
 * Represents an appointment in the Hospital OPD system
 */
@Document(collection = "appointments")
public class Appointment {
    
    @Id
    private String id;
    
    private String patientId;
    
    private String doctorId;
    
    private LocalDateTime appointmentTime;
    
    private String status; // "booked", "completed", "cancelled"
    
    private String patientName;
    
    private String doctorName;

    // Constructors
    public Appointment() {}

    public Appointment(String id, String patientId, String doctorId, LocalDateTime appointmentTime, 
                      String status, String patientName, String doctorName) {
        this.id = id;
        this.patientId = patientId;
        this.doctorId = doctorId;
        this.appointmentTime = appointmentTime;
        this.status = status;
        this.patientName = patientName;
        this.doctorName = doctorName;
    }

    // Getters and Setters
    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getPatientId() {
        return patientId;
    }

    public void setPatientId(String patientId) {
        this.patientId = patientId;
    }

    public String getDoctorId() {
        return doctorId;
    }

    public void setDoctorId(String doctorId) {
        this.doctorId = doctorId;
    }

    public LocalDateTime getAppointmentTime() {
        return appointmentTime;
    }

    public void setAppointmentTime(LocalDateTime appointmentTime) {
        this.appointmentTime = appointmentTime;
    }

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }

    public String getPatientName() {
        return patientName;
    }

    public void setPatientName(String patientName) {
        this.patientName = patientName;
    }

    public String getDoctorName() {
        return doctorName;
    }

    public void setDoctorName(String doctorName) {
        this.doctorName = doctorName;
    }
}
