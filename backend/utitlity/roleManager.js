const AccessControl = require('accesscontrol');

const roles = (function () {

  //R is reception
  //D is doctor
  const grantList = [
    {role: 'R', resource: 'appointment', action: 'create:any'},
    {role: 'R', resource: 'appointment', action: 'read:any'},
    {role: 'R', resource: 'appointment', action: 'update:any'},
    {role: 'R', resource: 'appointment', action: 'delete:any'},
    {role: 'R', resource: 'doctor', action: 'read:any'},
    {role: 'R', resource: 'appointmentStatus', action: 'create:any'},
    {role: 'R', resource: 'appointmentStatus', action: 'read:any'},
    {role: 'R', resource: 'appointmentStatus', action: 'update:any'},
    {role: 'R', resource: 'appointmentStatus', action: 'delete:any'},
    {role: 'R', resource: 'appointmentType', action: 'create:any'},
    {role: 'R', resource: 'appointmentType', action: 'read:any'},
    {role: 'R', resource: 'appointmentType', action: 'update:any'},
    {role: 'R', resource: 'appointmentType', action: 'delete:any'},
    {role: 'R', resource: 'patient', action: 'create:any'},
    {role: 'R', resource: 'patient', action: 'read:any'},
    {role: 'R', resource: 'patient', action: 'update:any'},
    {role: 'R', resource: 'patient', action: 'delete:any'},
    {role: 'R', resource: 'patientTitle', action: 'create:any'},
    {role: 'R', resource: 'patientTitle', action: 'read:any'},
    {role: 'R', resource: 'patientTitle', action: 'update:any'},
    {role: 'R', resource: 'patientTitle', action: 'delete:any'},
    {role: 'R', resource: 'emergencyTitle', action: 'create:any'},
    {role: 'R', resource: 'emergencyTitle', action: 'read:any'},
    {role: 'R', resource: 'emergencyTitle', action: 'update:any'},
    {role: 'R', resource: 'emergencyTitle', action: 'delete:any'},
    {role: 'R', resource: 'duration', action: 'create:any'},
    {role: 'R', resource: 'duration', action: 'read:any'},
    {role: 'R', resource: 'duration', action: 'update:any'},
    {role: 'R', resource: 'duration', action: 'delete:any'},

    {role: 'D', resource: 'appointment', action: 'create:own'},
    {role: 'D', resource: 'appointment', action: 'read:own'},
    {role: 'D', resource: 'appointment', action: 'update:own'},
    {role: 'D', resource: 'appointment', action: 'delete:own'},
    {role: 'D', resource: 'appointmentStatus', action: 'read:any'},
    {role: 'D', resource: 'appointmentType', action: 'read:any'},
    {role: 'D', resource: 'patient', action: 'read:any'},
    {role: 'D', resource: 'duration', action: 'read:any'},
    {role: 'D', resource: 'doctor', action: 'read:own'},
    {role: 'D', resource: 'doctor', action: 'delete:own'},
    {role: 'D', resource: 'doctor', action: 'update:own'},

  ];

  return new AccessControl(grantList);
})();

exports.getGrants = (function () {
  return roles;
})();

