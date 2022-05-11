import express from "express";
import patientService from "../services/patientService";
import { toNewPatient } from "../utils/patients";

const router = express.Router();

router.get("/", (_req, res) => {
  res.json(patientService.getNonSensitivePatients());
});

router.get("/:id", (req, res) => {
  const patient = patientService.getPatient(req.params.id);
  if (patient) {
    res.json(patient);
  } else {
    res.status(404).end();
  }
});

router.post("/", (req, res) => {
  const newPatient = toNewPatient(req.body as Record<string, unknown>);
  patientService.addPatient(newPatient);
  res.json(newPatient);
});

export default router;
