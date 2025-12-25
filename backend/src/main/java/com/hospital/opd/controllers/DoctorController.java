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

import com.hospital.opd.models.Doctor;
import com.hospital.opd.service.DoctorService;

/**
 * Doctor Controller
 * Handles all doctor-related HTTP requests
 */
@RestController
@RequestMapping("/api/doctors")
@CrossOrigin(origins = {"http://localhost:3000", "http://localhost:3001", "http://localhost:3002"})
public class DoctorController {

    @Autowired
    private DoctorService doctorService;

    /**
     * Add a new doctor
     * POST /api/doctors
     */
    @PostMapping
    public ResponseEntity<Doctor> addDoctor(@RequestBody Doctor doctor) {
        Doctor savedDoctor = doctorService.addDoctor(doctor);
        return new ResponseEntity<>(savedDoctor, HttpStatus.CREATED);
    }

    /**
     * Get all doctors
     * GET /api/doctors
     */
    @GetMapping
    public ResponseEntity<List<Doctor>> getAllDoctors() {
        List<Doctor> doctors = doctorService.getAllDoctors();
        return new ResponseEntity<>(doctors, HttpStatus.OK);
    }

    /**
     * Get doctor by ID
     * GET /api/doctors/{id}
     */
    @GetMapping("/{id}")
    public ResponseEntity<Doctor> getDoctorById(@PathVariable String id) {
        Optional<Doctor> doctor = doctorService.getDoctorById(id);
        if (doctor.isPresent()) {
            return new ResponseEntity<>(doctor.get(), HttpStatus.OK);
        }
        return new ResponseEntity<>(HttpStatus.NOT_FOUND);
    }

    /**
     * Get doctors by status (active/busy)
     * GET /api/doctors/status/{status}
     */
    @GetMapping("/status/{status}")
    public ResponseEntity<List<Doctor>> getDoctorByStatus(@PathVariable String status) {
        List<Doctor> doctors = doctorService.getDoctorByStatus(status);
        return new ResponseEntity<>(doctors, HttpStatus.OK);
    }

    /**
     * Get doctors by specialization
     * GET /api/doctors/specialization/{specialization}
     */
    @GetMapping("/specialization/{specialization}")
    public ResponseEntity<List<Doctor>> getDoctorBySpecialization(@PathVariable String specialization) {
        List<Doctor> doctors = doctorService.getDoctorBySpecialization(specialization);
        return new ResponseEntity<>(doctors, HttpStatus.OK);
    }

    /**
     * Update doctor
     * PUT /api/doctors/{id}
     */
    @PutMapping("/{id}")
    public ResponseEntity<Doctor> updateDoctor(@PathVariable String id, @RequestBody Doctor doctor) {
        Doctor updatedDoctor = doctorService.updateDoctor(id, doctor);
        if (updatedDoctor != null) {
            return new ResponseEntity<>(updatedDoctor, HttpStatus.OK);
        }
        return new ResponseEntity<>(HttpStatus.NOT_FOUND);
    }

    /**
     * Delete doctor
     * DELETE /api/doctors/{id}
     */
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteDoctor(@PathVariable String id) {
        doctorService.deleteDoctor(id);
        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }
}
