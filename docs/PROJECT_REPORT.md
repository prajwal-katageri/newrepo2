# Hospital OPD Management System — Project Report

Date: 04 Jan 2026

## 1. Overview
The **Hospital OPD Management System** is a full‑stack web application built to support outpatient department (OPD) workflows: patient registration, doctor management, and appointment booking.

The system is split into two deployable parts:
- **Backend**: Spring Boot REST API with MongoDB persistence.
- **Frontend**: React single‑page application (SPA) using React Router.

Primary goals:
- Maintain a clean record of **Patients**, **Doctors**, and **Appointments**.
- Provide a simple UI for staff to **add/list/delete** records and **book appointments**.
- Track doctor availability via a three‑state status model: **active**, **busy**, **inactive**.

## 2. Technology Stack
### Backend
- Java 21
- Spring Boot (Web, Data MongoDB, Security)
- Bean Validation (Jakarta Validation)
- MongoDB

### Frontend
- React
- React Router
- Axios
- Tailwind (configured) + app CSS files

## 3. Repository Structure (High Level)
- `backend/`: Spring Boot project
  - `src/main/java/com/hospital/opd/`: controllers, services, repositories, models
  - `src/main/resources/application.properties`: MongoDB + server port
- `opd-frontend/`: React application
  - `src/pages/`: pages for Patients, Doctors, Appointments, Auth
  - `src/services/`: API service modules (Axios)

## 4. Functional Modules
### 4.1 Authentication
- The UI has **Login** and **Register** pages.
- The route protection uses `ProtectedRoute`, which checks whether a token exists in `localStorage`.

Backend endpoints:
- `POST /api/auth/register`
- `POST /api/auth/login` (returns a token string)

Note: Backend security configuration currently permits requests broadly (see Section 9).

### 4.2 Patient Management
Frontend:
- List patients
- Add patient
- Delete patient

Backend endpoints:
- `GET /api/patients`
- `POST /api/patients`
- `DELETE /api/patients/{id}`

### 4.3 Doctor Management
Frontend:
- List doctors with status badge and status filter
- Add doctor
- Delete doctor
- Manually set status to inactive/active from the Doctor list

Backend endpoints:
- `GET /api/doctors`
- `GET /api/doctors/{id}`
- `GET /api/doctors/status/{status}`
- `GET /api/doctors/specialization/{specialization}`
- `POST /api/doctors`
- `PUT /api/doctors/{id}`
- `DELETE /api/doctors/{id}`

Doctor data model fields:
- name
- specialization
- email
- phone
- availableTime
- status

### 4.4 Appointment Management
Frontend:
- Book appointment (select patient, doctor, datetime)
- List appointments

Backend endpoints:
- `POST /api/appointments` (books appointment)
- `GET /api/appointments`
- `GET /api/appointments/{id}`
- `GET /api/appointments/patient/{patientId}`
- `GET /api/appointments/doctor/{doctorId}`
- `GET /api/appointments/status/{status}`
- `PUT /api/appointments/{id}/complete`
- `PUT /api/appointments/{id}/cancel`
- `DELETE /api/appointments/{id}`

Appointment validation:
- appointment time required
- appointment time cannot be in the past

## 5. Data Storage (MongoDB)
Database name: `hospital_db`

Collections:
- `patients`
- `doctors`
- `appointments`
- `users`

The application uses Spring Data repositories (`MongoRepository`) for CRUD access.

## 6. Doctor Status Rules (Active / Busy / Inactive)
The system supports **three** statuses:
- **inactive**: doctor is not available right now
- **busy**: doctor is currently considered booked (has at least one upcoming appointment in status `booked`)
- **active**: doctor is available and has no upcoming booked appointment

Rules used by the backend when returning doctors:
1) If the doctor is manually set to `inactive`, the API returns it as `inactive`.
2) Otherwise, if current time is outside `availableTime`, the API returns `inactive`.
3) Otherwise, if the doctor has any upcoming appointment with status `booked`, the API returns `busy`.
4) Otherwise, `active`.

Available time parsing:
- Supports formats like `9:00 AM - 5:00 PM` and `09:00 - 17:00`.
- Overnight windows like `10:00 PM - 6:00 AM` are handled.

Frontend behavior:
- Doctor dropdown in booking shows the status next to each doctor.
- Doctor list supports manual toggling inactive/active.

## 7. Input Validation (Doctor Phone)
Doctor phone number is enforced as **exactly 10 digits**.

Frontend:
- Phone input only allows digits and limits to 10 characters.
- Form validation requires `^\d{10}$`.

Backend:
- Bean Validation on the Doctor model:
  - not blank
  - exactly 10 digits

This ensures API requests cannot store invalid phone numbers even if the UI is bypassed.

## 8. Configuration & Runtime
Backend configuration:
- `server.port=8081`
- MongoDB at `mongodb://localhost:27017/hospital_db`

Typical local URLs:
- Frontend: `http://localhost:3000`
- Backend: `http://localhost:8081`

## 9. Security Notes
The backend includes Spring Security but is currently configured in a permissive way:
- CORS is enabled for localhost origins.
- CSRF is disabled.
- Most endpoints are effectively open (`permitAll`).

The frontend uses a token gate (`ProtectedRoute`), but the backend does not enforce JWT auth on APIs.

Recommendation:
- Add JWT authentication filter and protect routes server‑side.

## 10. Development Tasks & Fixes Applied
- VS Code tasks were adjusted to avoid nested PowerShell invocation issues, using `cwd` + direct commands.
- Doctor phone is validated in both UI and API.
- Doctor status is now consistent across list and booking flows and supports manual inactive.

## 11. Known Limitations & Suggested Enhancements
- Doctor “busy” is computed from the existence of upcoming booked appointments (not time‑slot overlap). Consider checking appointment overlap per time window.
- Adding server‑side authorization is important if the app is used outside local demo scope.
- Consider adding update/edit pages for Patient/Doctor instead of only add/delete.

## 12. How to Run
### Prerequisites
- MongoDB running locally
- Node.js + npm
- Java 21

### Backend
From `backend/`:
- `./mvnw.cmd spring-boot:run`

### Frontend
From `opd-frontend/`:
- `npm install`
- `npm start`

---
End of report.
