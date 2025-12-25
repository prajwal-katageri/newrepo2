package com.hospital.opd.services;

import java.util.List;

import com.hospital.opd.models.Patient;

public interface PatientService {
    
    List<Patient> getAllPatients();
    
    Patient savePatient(Patient patient);
    
    void deletePatient(String id);
}
