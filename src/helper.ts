import deleteRecords from "./routes/pain_records/deleteRecords";
import getRecords from "./routes/pain_records/getRecords";
import uploadRecords from "./routes/pain_records/uploadRecords";
import addPatient from "./routes/patients/addPatient";
import deletePatient from "./routes/patients/deletePatient";
import getPatients from "./routes/patients/getPatients";
import { Express } from "express";
import login from "./routes/user/login";
import register from "./routes/user/register";
import deleteUser from "./routes/user/deleteUser";
import getUsers from "./routes/user/getUsers";

function dateParser(date: string): Date {
  const dateSplitted = date.split(" ");
  if (dateSplitted.length !== 2) {
    dateSplitted[1]= "00:00:00";
  }
  const datePart = dateSplitted[0].split(/[-\/]/);
  const timePart = dateSplitted[1].split(":");
  const day = datePart[0];
  const month = datePart[1];
  const year = datePart[2];
  const hour = timePart[0];
  const minute = timePart[1];
  const second = timePart[2];

  return new Date(Number(year), Number(month) - 1, Number(day), Number(hour), Number(minute), Number(second));
}

function loadRoutes(app: Express) {
  patientRoutes(app);
  painRecordsRoutes(app);
  userRoutes(app);
}
function patientRoutes(app: Express) {
  deletePatient(app);
  getPatients(app);
  addPatient(app);
}
function userRoutes(app: Express) {
  login(app);
  register(app);
  deleteUser(app);
  getUsers(app);
}
function painRecordsRoutes(app: Express) {
  deleteRecords(app);
  getRecords(app);
  uploadRecords(app);
}


  

export { dateParser, loadRoutes };
