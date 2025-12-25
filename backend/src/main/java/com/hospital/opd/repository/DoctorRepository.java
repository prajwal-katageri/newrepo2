package com.hospital.opd.repository;

import com.hospital.opd.models.Doctor;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;
import java.util.List;

/**
 * Doctor Repository
 * Handles database operations for Doctor entity
 */
@Repository
public interface DoctorRepository extends MongoRepository<Doctor, String> {
    List<Doctor> findByStatus(String status);
    List<Doctor> findBySpecialization(String specialization);
}
