import express, { NextFunction, Request, Response } from "express";
import { Patient } from "../../types";
import patientService from "../services/patientService";
import { toNewEntry } from "../utils/entries";
import { toNewPatient } from "../utils/patients";

declare module "express-serve-static-core" {
  interface Request {
    patient: Patient;
  }
}

const router = express.Router();

router.get("/", (_req, res) => {
  res.json(patientService.getNonSensitivePatients());
});

router.post("/", (req, res) => {
  const newPatient = toNewPatient(req.body as Record<string, unknown>);
  const patient = patientService.addPatient(newPatient);
  res.json(patient);
});

router.get("/:id", getPatient, (req, res) => {
  res.json(req.patient);
});

router.post("/:id/entries", getPatient, (req, res) => {
  const newEntry = toNewEntry(req.body as Record<string, unknown>);
  const entry = patientService.addEntry(req.patient, newEntry);
  res.json(entry);
});

function getPatient(req: Request, res: Response, next: NextFunction) {
  const patient = patientService.getPatient(req.params.id);
  if (patient) {
    req.patient = patient;
    next();
  } else {
    res.status(404).end();
  }
}

export default router;
