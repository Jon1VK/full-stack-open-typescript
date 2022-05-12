import patients from "../../data/patients";
import { v1 as uuid } from "uuid";
import {
  NonSensitivePatient,
  Patient,
  NewPatient,
  NewEntry,
  Entry,
} from "../../types";

const getPatients = () => {
  return patients;
};

const getPatient = (id: string) => {
  return patients.find((patient) => patient.id === id);
};

const getNonSensitivePatients = (): NonSensitivePatient[] => {
  return patients.map(({ dateOfBirth, gender, id, name, occupation }) => ({
    id,
    name,
    dateOfBirth,
    gender,
    occupation,
  }));
};

const addPatient = (newPatient: NewPatient): Patient => {
  const patient: Patient = {
    id: uuid(),
    ...newPatient,
  };
  patients.push(patient);
  return patient;
};

const addEntry = (patient: Patient, newEntry: NewEntry) => {
  const entry: Entry = {
    id: uuid(),
    ...newEntry,
  };
  patient.entries.push(entry);
  return entry;
};

export default {
  getPatients,
  getPatient,
  getNonSensitivePatients,
  addPatient,
  addEntry,
};
