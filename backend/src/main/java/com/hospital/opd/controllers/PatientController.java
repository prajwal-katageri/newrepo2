package com.hospital.opd.controllers;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.hospital.opd.models.Patient;
import com.hospital.opd.services.PatientService;

/**
 * REST Controller for Patient Management
 * Handles all patient-related HTTP requests
 * 
 * @author Hospital OPD System
 * @version 1.0
 */
@RestController
@RequestMapping("/api/patients")
@CrossOrigin(origins = {"http://localhost:3000", "http://localhost:3001", "http://localhost:3002"})
public class PatientController {

    @Autowired
    private PatientService patientService;

    /**
     * Get all patients from the database
     * 
     * @return ResponseEntity containing list of all patients
     * Endpoint: GET /api/patients
     */
    @GetMapping
    public ResponseEntity<List<Patient>> getAllPatients() {
        List<Patient> patients = patientService.getAllPatients();
        return new ResponseEntity<>(patients, HttpStatus.OK);
    }

    /**
     * Create a new patient record
     * 
     * @param patient Patient object from request body
     * @return ResponseEntity containing the saved patient with generated ID
     * Endpoint: POST /api/patients
     */
    @PostMapping
    public ResponseEntity<Patient> createPatient(@RequestBody Patient patient) {
        Patient savedPatient = patientService.savePatient(patient);
        return new ResponseEntity<>(savedPatient, HttpStatus.CREATED);
    }

    /**
     * Delete a patient by ID
     * 
     * @param id Patient ID to delete
     * @return ResponseEntity with no content
     * Endpoint: DELETE /api/patients/{id}
     */
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deletePatient(@PathVariable String id) {
        patientService.deletePatient(id);
        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }
}