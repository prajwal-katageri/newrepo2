package com.hospital.opd.service.impl;

import com.hospital.opd.models.Doctor;
import com.hospital.opd.repository.AppointmentRepository;
import com.hospital.opd.repository.DoctorRepository;
import com.hospital.opd.service.DoctorService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.time.LocalTime;
import java.time.format.DateTimeFormatter;
import java.time.format.DateTimeFormatterBuilder;
import java.time.format.DateTimeParseException;
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

    @Autowired
    private AppointmentRepository appointmentRepository;

    @Override
    public Doctor addDoctor(Doctor doctor) {
        doctor.setStatus("active");
        return doctorRepository.save(doctor);
    }

    @Override
    public List<Doctor> getAllDoctors() {
        List<Doctor> doctors = doctorRepository.findAll();
        doctors.forEach(this::applyComputedStatus);
        return doctors;
    }

    @Override
    public Optional<Doctor> getDoctorById(String id) {
        Optional<Doctor> doctor = doctorRepository.findById(id);
        doctor.ifPresent(this::applyComputedStatus);
        return doctor;
    }

    @Override
    public List<Doctor> getDoctorByStatus(String status) {
        List<Doctor> doctors = doctorRepository.findByStatus(status);
        doctors.forEach(this::applyComputedStatus);
        return doctors;
    }

    @Override
    public List<Doctor> getDoctorBySpecialization(String specialization) {
        List<Doctor> doctors = doctorRepository.findBySpecialization(specialization);
        doctors.forEach(this::applyComputedStatus);
        return doctors;
    }

    private void applyComputedStatus(Doctor doctor) {
        if (doctor == null || doctor.getId() == null) {
            return;
        }

        // Manual override: if explicitly marked inactive, keep it inactive.
        if ("inactive".equalsIgnoreCase(doctor.getStatus())) {
            doctor.setStatus("inactive");
            return;
        }

        if (!isCurrentlyWithinAvailableTime(doctor.getAvailableTime())) {
            doctor.setStatus("inactive");
            return;
        }

        boolean hasBookedAppointment = appointmentRepository
                .findByDoctorId(doctor.getId())
                .stream()
                .anyMatch(a -> a != null
                        && "booked".equalsIgnoreCase(a.getStatus())
                        && a.getAppointmentTime() != null
                        && !a.getAppointmentTime().isBefore(LocalDateTime.now()));

        doctor.setStatus(hasBookedAppointment ? "busy" : "active");
    }

    private boolean isCurrentlyWithinAvailableTime(String availableTime) {
        if (availableTime == null || availableTime.trim().isEmpty()) {
            return true;
        }

        String[] parts = availableTime.split("\\s*[-–—]\\s*");
        if (parts.length != 2) {
            return true;
        }

        Optional<LocalTime> start = parseLocalTime(parts[0]);
        Optional<LocalTime> end = parseLocalTime(parts[1]);
        if (start.isEmpty() || end.isEmpty()) {
            return true;
        }

        LocalTime now = LocalTime.now();
        LocalTime startTime = start.get();
        LocalTime endTime = end.get();

        // Normal range (e.g., 09:00-17:00)
        if (!endTime.isBefore(startTime)) {
            return !now.isBefore(startTime) && !now.isAfter(endTime);
        }

        // Overnight range (e.g., 22:00-06:00)
        return !now.isBefore(startTime) || !now.isAfter(endTime);
    }

    private Optional<LocalTime> parseLocalTime(String raw) {
        if (raw == null) {
            return Optional.empty();
        }
        String text = raw.trim().replaceAll("\\s+", " ");
        if (text.isEmpty()) {
            return Optional.empty();
        }

        DateTimeFormatter ampmFormatter = new DateTimeFormatterBuilder()
                .parseCaseInsensitive()
                .appendPattern("h:mm a")
                .toFormatter();

        DateTimeFormatter ampmHourOnlyFormatter = new DateTimeFormatterBuilder()
                .parseCaseInsensitive()
                .appendPattern("h a")
                .toFormatter();

        DateTimeFormatter twentyFourHourFormatter = DateTimeFormatter.ofPattern("H:mm");

        for (DateTimeFormatter formatter : new DateTimeFormatter[] { ampmFormatter, ampmHourOnlyFormatter, twentyFourHourFormatter }) {
            try {
                return Optional.of(LocalTime.parse(text, formatter));
            } catch (DateTimeParseException ignored) {
                // try next
            }
        }

        return Optional.empty();
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
