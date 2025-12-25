package com.hospital.opd.models;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

/**
 * Doctor Model
 * Represents a doctor in the Hospital OPD system
 */
@Document(collection = "doctors")
public class Doctor {
    
    @Id
    private String id;
    
    private String name;
    
    private String specialization;
    
    private String email;
    
    private String phone;
    
    private String availableTime;
    
    private String status; // "active" or "busy"

    // Constructors
    public Doctor() {}

    public Doctor(String id, String name, String specialization, String email, 
                 String phone, String availableTime, String status) {
        this.id = id;
        this.name = name;
        this.specialization = specialization;
        this.email = email;
        this.phone = phone;
        this.availableTime = availableTime;
        this.status = status;
    }

    // Getters and Setters
    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getSpecialization() {
        return specialization;
    }

    public void setSpecialization(String specialization) {
        this.specialization = specialization;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getPhone() {
        return phone;
    }

    public void setPhone(String phone) {
        this.phone = phone;
    }

    public String getAvailableTime() {
        return availableTime;
    }

    public void setAvailableTime(String availableTime) {
        this.availableTime = availableTime;
    }

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }
}
