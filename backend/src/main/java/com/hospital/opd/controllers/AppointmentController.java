package com.hospital.opd.controllers;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.hospital.opd.models.Appointment;
import com.hospital.opd.service.AppointmentService;

/**
 * Appointment Controller
 * Handles all appointment-related HTTP requests
 */
@RestController
@RequestMapping("/api/appointments")
@CrossOrigin(origins = {"http://localhost:3000", "http://localhost:3001", "http://localhost:3002"})
public class AppointmentController {

    @Autowired
    private AppointmentService appointmentService;

    /**
     * Book an appointment
     * POST /api/appointments
     */
    @PostMapping
    public ResponseEntity<Appointment> bookAppointment(@RequestBody Appointment appointment) {
        Appointment bookedAppointment = appointmentService.bookAppointment(appointment);
        return new ResponseEntity<>(bookedAppointment, HttpStatus.CREATED);
    }

    /**
     * Get all appointments
     * GET /api/appointments
     */
    @GetMapping
    public ResponseEntity<List<Appointment>> getAppointments() {
        List<Appointment> appointments = appointmentService.getAppointments();
        return new ResponseEntity<>(appointments, HttpStatus.OK);
    }

    /**
     * Get appointments by patient ID
     * GET /api/appointments/patient/{patientId}
     */
    @GetMapping("/patient/{patientId}")
    public ResponseEntity<List<Appointment>> getAppointmentsByPatientId(@PathVariable String patientId) {
        List<Appointment> appointments = appointmentService.getAppointmentsByPatientId(patientId);
        return new ResponseEntity<>(appointments, HttpStatus.OK);
    }

    /**
     * Get appointments by doctor ID
     * GET /api/appointments/doctor/{doctorId}
     */
    @GetMapping("/doctor/{doctorId}")
    public ResponseEntity<List<Appointment>> getAppointmentsByDoctorId(@PathVariable String doctorId) {
        List<Appointment> appointments = appointmentService.getAppointmentsByDoctorId(doctorId);
        return new ResponseEntity<>(appointments, HttpStatus.OK);
    }

    /**
     * Get appointments by status
     * GET /api/appointments/status/{status}
     */
    @GetMapping("/status/{status}")
    public ResponseEntity<List<Appointment>> getAppointmentsByStatus(@PathVariable String status) {
        List<Appointment> appointments = appointmentService.getAppointmentsByStatus(status);
        return new ResponseEntity<>(appointments, HttpStatus.OK);
    }

    /**
     * Get appointment by ID
     * GET /api/appointments/{id}
     */
    @GetMapping("/{id}")
    public ResponseEntity<Appointment> getAppointmentById(@PathVariable String id) {
        Optional<Appointment> appointment = appointmentService.getAppointmentById(id);
        if (appointment.isPresent()) {
            return new ResponseEntity<>(appointment.get(), HttpStatus.OK);
        }
        return new ResponseEntity<>(HttpStatus.NOT_FOUND);
    }

    /**
     * Complete an appointment
     * PUT /api/appointments/{id}/complete
     */
    @PutMapping("/{id}/complete")
    public ResponseEntity<Appointment> completeAppointment(@PathVariable String id) {
        Appointment appointment = appointmentService.completeAppointment(id);
        if (appointment != null) {
            return new ResponseEntity<>(appointment, HttpStatus.OK);
        }
        return new ResponseEntity<>(HttpStatus.NOT_FOUND);
    }

    /**
     * Cancel an appointment
     * PUT /api/appointments/{id}/cancel
     */
    @PutMapping("/{id}/cancel")
    public ResponseEntity<Appointment> cancelAppointment(@PathVariable String id) {
        Appointment appointment = appointmentService.cancelAppointment(id);
        if (appointment != null) {
            return new ResponseEntity<>(appointment, HttpStatus.OK);
        }
        return new ResponseEntity<>(HttpStatus.NOT_FOUND);
    }

    /**
     * Delete an appointment
     * DELETE /api/appointments/{id}
     */
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteAppointment(@PathVariable String id) {
        appointmentService.deleteAppointment(id);
        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }
}
