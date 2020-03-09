const appointmentTable = "CREATE TABLE \"Appointment\" (\n" +
  "\t\"id\"\tINTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,\n" +
  "\t\"patientId\"\tINTEGER NOT NULL,\n" +
  "\t\"appointmentTypeId\"\tINTEGER NOT NULL,\n" +
  "\t\"appointmentStatusId\"\tINTEGER NOT NULL,\n" +
  "\t\"startDateTime\"\tTEXT NOT NULL,\n" +
  "\t\"endDateTime\"\tTEXT NOT NULL,\n" +
  "\t\"isServed\"\tINTEGER,\n" +
  "\t\"servedBy\"\tINTEGER\n" +
  ");";

const appointmentType = "CREATE TABLE \"appointmentType\" (\n" +
  "\t\"id\"\tTEXT NOT NULL UNIQUE,\n" +
  "\t\"type\"\tTEXT NOT NULL\n" +
  ");";

const appointmentStatus = "CREATE TABLE \"appointmentStatus\" (\n" +
  "\t\"id\"\tTEXT NOT NULL UNIQUE,\n" +
  "\t\"status\"\tTEXT NOT NULL\n" +
  ");";

const patient = "CREATE TABLE \"Patient\" (\n" +
  "\t\"seq\"\tINTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,\n" +
  "\t\"patientTitleId\"\tINTEGER NOT NULL,\n" +
  "\t\"firstName\"\tTEXT NOT NULL,\n" +
  "\t\"middleName\"\tTEXT NOT NULL,\n" +
  "\t\"lastName\"\tTEXT NOT NULL,\n" +
  "\t\"gender\"\tTEXT NOT NULL,\n" +
  "\t\"dateOfBirth\"\tTEXT NOT NULL,\n" +
  "\t\"age\"\tINTEGER NOT NULL,\n" +
  "\t\"nationality\"\tINTEGER,\n" +
  "\t\"active\"\tINTEGER DEFAULT 0,\n" +
  "\t\"contactId\"\tINTEGER NOT NULL,\n" +
  "\t\"addressId\"\tINTEGER NOT NULL,\n" +
  "\t\"regDate\"\tTEXT NOT NULL,\n" +
  "\t\"emergencyInfoId\"\tINTEGER NOT NULL\n" +
  ");";

const patientTitle = "CREATE TABLE \"PatientTitle\" (\n" +
  "\t\"id\"\tTEXT NOT NULL UNIQUE,\n" +
  "\t\"title\"\tTEXT NOT NULL\n" +
  ");";

const contact = "CREATE TABLE \"Contact\" (\n" +
  "\t\"id\"\tTEXT NOT NULL UNIQUE,\n" +
  "\t\"email\"\tTEXT,\n" +
  "\t\"phoneNumber\"\tTEXT,\n" +
  "\t\"alternatePhoneNumber\"\tTEXT\n" +
  ");";

const address = "CREATE TABLE \"Address\" (\n" +
  "\t\"id\"\tTEXT NOT NULL UNIQUE,\n" +
  "\t\"line1\"\tTEXT,\n" +
  "\t\"line2\"\tTEXT,\n" +
  "\t\"city\"\tTEXT,\n" +
  "\t\"country\"\tTEXT\n" +
  ");";

const emergencyContact = "CREATE TABLE \"EmergencyContact\" (\n" +
  "\t\"id\"\tTEXT NOT NULL UNIQUE,\n" +
  "\t\"emergencyTitleId\"\tINTEGER,\n" +
  "\t\"name\"\tTEXT,\n" +
  "\t\"phoneNumber\"\tTEXT,\n" +
  "\t\"alternatePhoneNumber\"\tTEXT\n" +
  ");";

const emergencyTitle = "CREATE TABLE \"emergencyTitle\" (\n" +
  "\t\"id\"\tTEXT NOT NULL UNIQUE,\n" +
  "\t\"title\"\tTEXT NOT NULL\n" +
  ");";

const doctor = "CREATE TABLE \"Doctor\" (\n" +
  "\t\"seq\"\tINTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,\n" +
  "\t\"name\"\tTEXT NOT NULL,\n" +
  "\t\"username\"\tTEXT NOT NULL UNIQUE,\n" +
  "\t\"password\"\tTEXT NOT NULL,\n" +
  "\t\"displayOrder\"\tINTEGER,\n" +
  "\t\"manageBlocks\"\tINTEGER NOT NULL,\n" +
  "\t\"manageBooking\"\tINTEGER NOT NULL,\n" +
  "\t\"isDoctor\"\tINTEGER NOT NULL\n" +
  ");";

const duration = "CREATE TABLE \"duration\" (\n" +
  "\t\"id\"\tTEXT NOT NULL UNIQUE,\n" +
  "\t\"duration\"\tINTEGER NOT NULL\n" +
  ");";

module.exports = {
  "appointmentTable": appointmentTable,
  "appointmentType": appointmentType,
  "appointmentStatus": appointmentStatus,
  "patient": patient,
  "patientTitle": patientTitle,
  "contact": contact,
  "address": address,
  "emergencyContact": emergencyContact,
  "emergencyTitle": emergencyTitle,
  "doctor": doctor,
  "duration": duration
};
