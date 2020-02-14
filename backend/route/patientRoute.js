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

module.exports = router;
