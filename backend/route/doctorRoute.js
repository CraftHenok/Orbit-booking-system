const express = require("express");
const doctorsController = require("../controller/doctorsController");
const router = express.Router();

router.get('/', doctorsController.getAllDoctors);
router.get('/byId/:seq', doctorsController.getDoctorById);
router.get('/byName/:name', doctorsController.getDoctorByName);
router.post('/', doctorsController.saveNewDoctor);
router.put('/:seq', doctorsController.update);
router.patch('/:seq', doctorsController.update);
router.delete('/:seq', doctorsController.deleteDoctorById);

module.exports = router;
