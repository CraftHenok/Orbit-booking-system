const express = require("express");
const patientsController = require("../controller/patientsController");
const router = express.Router();


router.get('/', patientsController.getAllPatients);
router.get('/byId/:patientId', patientsController.getPatientById);
router.get('/byName/:name', patientsController.getPatientByName);
router.post('/', patientsController.saveNewPatient);
router.delete('/:patientId', patientsController.deleteByPatientId);
router.patch('/:patientId', patientsController.updatePatientById);
router.put('/:patientId', patientsController.updatePatientById);

//patient detail queries
router.get('/contactInfo/:contactId', patientsController.getContactById);
router.get('/address/:addressId', patientsController.getAddressById);
router.get('/emergencyInfo/:emergencyInfoId', patientsController.getEmergencyInfoById);


router.get('/titles', patientsController.getPatientsTitle);
router.get('/emergencyTitle', patientsController.getEmergencyTitle);

module.exports = router;
