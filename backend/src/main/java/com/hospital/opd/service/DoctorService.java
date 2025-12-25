package com.hospital.opd.service;

import com.hospital.opd.models.Doctor;
import java.util.List;
import java.util.Optional;

/**
 * Doctor Service Interface
 * Defines business logic for Doctor management
 */
public interface DoctorService {
    
    Doctor addDoctor(Doctor doctor);
    
    List<Doctor> getAllDoctors();
    
    Optional<Doctor> getDoctorById(String id);
    
    List<Doctor> getDoctorByStatus(String status);
    
    List<Doctor> getDoctorBySpecialization(String specialization);
    
    Doctor updateDoctor(String id, Doctor doctor);
    
    void deleteDoctor(String id);
}
