package com.hospital.opd.service.impl;

import com.hospital.opd.models.Doctor;
import com.hospital.opd.repository.DoctorRepository;
import com.hospital.opd.service.DoctorService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.List;
import java.util.Optional;

/**
 * Doctor Service Implementation
 * Implements business logic for Doctor management
 */
@Service
public class DoctorServiceImpl implements DoctorService {

    @Autowired
    private DoctorRepository doctorRepository;

    @Override
    public Doctor addDoctor(Doctor doctor) {
        doctor.setStatus("active");
        return doctorRepository.save(doctor);
    }

    @Override
    public List<Doctor> getAllDoctors() {
        return doctorRepository.findAll();
    }

    @Override
    public Optional<Doctor> getDoctorById(String id) {
        return doctorRepository.findById(id);
    }

    @Override
    public List<Doctor> getDoctorByStatus(String status) {
        return doctorRepository.findByStatus(status);
    }

    @Override
    public List<Doctor> getDoctorBySpecialization(String specialization) {
        return doctorRepository.findBySpecialization(specialization);
    }

    @Override
    public Doctor updateDoctor(String id, Doctor doctor) {
        Optional<Doctor> existingDoctor = doctorRepository.findById(id);
        if (existingDoctor.isPresent()) {
            Doctor docToUpdate = existingDoctor.get();
            if (doctor.getName() != null) docToUpdate.setName(doctor.getName());
            if (doctor.getSpecialization() != null) docToUpdate.setSpecialization(doctor.getSpecialization());
            if (doctor.getEmail() != null) docToUpdate.setEmail(doctor.getEmail());
            if (doctor.getPhone() != null) docToUpdate.setPhone(doctor.getPhone());
            if (doctor.getAvailableTime() != null) docToUpdate.setAvailableTime(doctor.getAvailableTime());
            if (doctor.getStatus() != null) docToUpdate.setStatus(doctor.getStatus());
            return doctorRepository.save(docToUpdate);
        }
        return null;
    }

    @Override
    public void deleteDoctor(String id) {
        doctorRepository.deleteById(id);
    }
}
