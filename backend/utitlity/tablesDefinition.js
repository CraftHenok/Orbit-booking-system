const appointment = "CREATE TABLE \"Appointment\" (\n" +
  "\t\"patientId\"\tINTEGER NOT NULL,\n" +
  "\t\"appointmentTypeId\"\tINTEGER NOT NULL,\n" +
  "\t\"appointmentStatusId\"\tINTEGER NOT NULL,\n" +
  "\t\"startDateTime\"\tTEXT NOT NULL,\n" +
  "\t\"endDateTime\"\tTEXT NOT NULL,\n" +
  "\t\"isServed\"\tINTEGER,\n" +
  "\t\"servedBy\"\tINTEGER,\n" +
  "\t\"userId\"\tINTEGER NOT NULL,\n" +
  "\t\"id\"\tINTEGER PRIMARY KEY AUTOINCREMENT\n" +
  ");";

const appointmentType = "CREATE TABLE \"appointmentType\" (\n" +
  "\t\"type\"\tTEXT NOT NULL,\n" +
  "\t\"id\"\tINTEGER PRIMARY KEY AUTOINCREMENT\n" +
  ");";

const appointmentStatus = "CREATE TABLE \"appointmentStatus\" (\n" +
  "\t\"status\"\tTEXT NOT NULL,\n" +
  "\t\"id\"\tINTEGER PRIMARY KEY AUTOINCREMENT\n" +
  ");";

const patient = "CREATE TABLE \"Patient\" (\n" +
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
  "\t\"emergencyInfoId\"\tINTEGER NOT NULL,\n" +
  "\t\"id\"\tINTEGER PRIMARY KEY AUTOINCREMENT\n" +
  ");";

const patientTitle = "CREATE TABLE \"PatientTitle\" (\n" +
  "\t\"title\"\tTEXT NOT NULL,\n" +
  "\t\"id\"\tINTEGER PRIMARY KEY AUTOINCREMENT\n" +
  ");";

const contact = "CREATE TABLE \"Contact\" (\n" +
  "\t\"email\"\tTEXT,\n" +
  "\t\"phoneNumber\"\tTEXT,\n" +
  "\t\"alternatePhoneNumber\"\tTEXT,\n" +
  "\t\"id\"\tINTEGER PRIMARY KEY AUTOINCREMENT\n" +
  ");";

const address = "CREATE TABLE \"Address\" (\n" +
  "\t\"line1\"\tTEXT,\n" +
  "\t\"line2\"\tTEXT,\n" +
  "\t\"city\"\tTEXT,\n" +
  "\t\"country\"\tTEXT,\n" +
  "\t\"id\"\tINTEGER PRIMARY KEY AUTOINCREMENT\n" +
  ");";

const emergencyContact = "CREATE TABLE \"EmergencyContact\" (\n" +
  "\t\"emergencyTitleId\"\tINTEGER,\n" +
  "\t\"name\"\tTEXT,\n" +
  "\t\"phoneNumber\"\tTEXT,\n" +
  "\t\"alternatePhoneNumber\"\tTEXT,\n" +
  "\t\"id\"\tINTEGER PRIMARY KEY AUTOINCREMENT\n" +
  ");";

const emergencyTitle = "CREATE TABLE \"emergencyTitle\" (\n" +
  "\t\"title\"\tTEXT NOT NULL,\n" +
  "\t\"id\"\tINTEGER PRIMARY KEY AUTOINCREMENT\n" +
  ");";

const doctor = "CREATE TABLE \"Doctor\" (\n" +
  "\t\"id\"\tINTEGER PRIMARY KEY AUTOINCREMENT,\n" +
  "\t\"userId\"\tINTEGER NOT NULL,\n" +
  "\t\"displayOrder\"\tINTEGER\n" +
  ");";

const duration = "CREATE TABLE \"duration\" (\n" +
  "\t\"duration\"\tINTEGER NOT NULL,\n" +
  "\t\"id\"\tINTEGER PRIMARY KEY AUTOINCREMENT\n" +
  ");";

const user = "CREATE TABLE \"User\" (\n" +
  "\t\"email\"\tTEXT NOT NULL UNIQUE,\n" +
  "\t\"password\"\tTEXT NOT NULL,\n" +
  "\t\"role\"\tTEXT NOT NULL,\n" +
  "\t\"id\"\tINTEGER PRIMARY KEY AUTOINCREMENT,\n" +
  "\t\"status\"\tTEXT,\n" +
  "\t\"username\"\tTEXT\n" +
  ");";

const scheduleBlocking = "CREATE TABLE \"LocalScheduleBlocking\" (\n" +
  "\t\"id\"\tINTEGER PRIMARY KEY AUTOINCREMENT,\n" +
  "\t\"startDate\"\tINTEGER NOT NULL,\n" +
  "\t\"endDate\"\tINTEGER NOT NULL,\n" +
  "\t\"userId\"\tINTEGER NOT NULL,\n" +
  "\t\"reason\"\tTEXT\n" +
  ");";

module.exports = {
  "appointmentTable": appointment,
  "appointmentType": appointmentType,
  "appointmentStatus": appointmentStatus,
  "patient": patient,
  "patientTitle": patientTitle,
  "contact": contact,
  "address": address,
  "emergencyContact": emergencyContact,
  "emergencyTitle": emergencyTitle,
  "doctor": doctor,
  "duration": duration,
  "user": user,
  "scheduleBlocking": scheduleBlocking
};
