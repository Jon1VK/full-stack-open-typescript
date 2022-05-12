import { EntryType, NewBaseEntry, NewEntry } from "../../types";
import assertNever from "./assertNever";
import {
  isDate,
  isDischarge,
  isEntryType,
  isHealthCheckRating,
  isSickLeave,
  isString,
  isStringArray,
} from "./typeGuards";

export const toNewEntry = (object: Record<string, unknown>): NewEntry => {
  const baseEntry: NewBaseEntry = {
    description: parseDescription(object.description),
    date: parseDate(object.date),
    specialist: parseSpecialist(object.specialist),
    diagnosisCodes: parseDiagnosesCodes(object.diagnosisCodes),
  };
  const type = parseType(object.type);
  switch (type) {
    case EntryType.HealthCheck:
      return {
        type,
        ...baseEntry,
        healthCheckRating: parseHealthCheckRating(object.healthCheckRating),
      };
    case EntryType.Hospital:
      return {
        type,
        ...baseEntry,
        discharge: parseDischarge(object.discharge),
      };
    case EntryType.OccupationalHealthcare:
      return {
        type,
        ...baseEntry,
        employerName: parseEmployerName(object.employerName),
        sickLeave: parseSickLeave(object.sickLeave),
      };
    default:
      return assertNever(type);
  }
};

const parseType = (type: unknown) => {
  if (!type || !isEntryType(type)) {
    throw new Error(`Incorrect or missing type: ${type}`);
  }
  return type;
};

const parseDescription = (description: unknown) => {
  if (!description || !isString(description)) {
    throw new Error(`Incorrect or missing description: ${description}`);
  }
  return description;
};

const parseDate = (date: unknown) => {
  if (!date || !isDate(date)) {
    throw new Error(`Incorrect or missing date: ${date}`);
  }
  return date;
};

const parseSpecialist = (specialist: unknown) => {
  if (!specialist || !isString(specialist)) {
    throw new Error(`Incorrect or missing specialist: ${specialist}`);
  }
  return specialist;
};

const parseDiagnosesCodes = (codes: unknown) => {
  if (!codes || !isStringArray(codes)) {
    throw new Error(`Incorrect or missing diagnoses codes: ${codes}`);
  }
  return codes;
};

const parseHealthCheckRating = (healthCheckRating: unknown) => {
  if (healthCheckRating == null || !isHealthCheckRating(healthCheckRating)) {
    throw new Error(
      `Incorrect or missing health check rating: ${healthCheckRating}`
    );
  }
  return healthCheckRating;
};

const parseDischarge = (discharge: unknown) => {
  if (!discharge || !isDischarge(discharge)) {
    throw new Error(`Incorrect or missing discharge: ${discharge}`);
  }
  return discharge;
};

const parseEmployerName = (name: unknown) => {
  if (!name || !isString(name)) {
    throw new Error(`Incorrect or missing employer name: ${name}`);
  }
  return name;
};

const parseSickLeave = (sickLeave: unknown) => {
  if (!sickLeave) return undefined;
  if (!isSickLeave(sickLeave)) {
    throw new Error(`Incorrect sick leave: ${sickLeave}`);
  }
  if (sickLeave.startDate === "" && sickLeave.endDate === "") return undefined;
  return sickLeave;
};
