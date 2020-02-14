const express = require("express");
const appointmentController = require("../controller/appointmentsController");
const router = express.Router();

router.get('/', appointmentController.getAllAppointments);
router.get('/doctors/:doctorId', appointmentController.getDoctorAppointments);
router.get('/patients/:patientId', appointmentController.getPatientAppointment);
router.post('/', appointmentController.saveNewAppointment);
router.delete('/:appointmentId', appointmentController.deleteAppointmentById);
router.put('/:appointmentId', appointmentController.updateAppointment);
router.patch('/:appointmentId', appointmentController.updateAppointment);

module.exports = router;
