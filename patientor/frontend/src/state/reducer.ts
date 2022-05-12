import { State } from "./state";
import { Diagnosis, Entry, Patient } from "../types";

export type Action =
  | {
      type: "SET_PATIENT_LIST";
      payload: Patient[];
    }
  | {
      type: "ADD_PATIENT";
      payload: Patient;
    }
  | {
      type: "ADD_ENTRY";
      payload: {
        patientId: string;
        entry: Entry;
      };
    }
  | {
      type: "SET_DIAGNOSIS_LIST";
      payload: Diagnosis[];
    };

export const setPatientList = (patientList: Patient[]): Action => ({
  type: "SET_PATIENT_LIST",
  payload: patientList,
});

export const addPatient = (patient: Patient): Action => ({
  type: "ADD_PATIENT",
  payload: patient,
});

export const addEntry = (patientId: string, entry: Entry): Action => ({
  type: "ADD_ENTRY",
  payload: {
    patientId,
    entry,
  },
});

export const setDiagnosisList = (diagnosisList: Diagnosis[]): Action => ({
  type: "SET_DIAGNOSIS_LIST",
  payload: diagnosisList,
});

export const reducer = (state: State, action: Action): State => {
  switch (action.type) {
    case "SET_PATIENT_LIST":
      return {
        ...state,
        patients: {
          ...action.payload.reduce(
            (memo, patient) => ({ ...memo, [patient.id]: patient }),
            {}
          ),
          ...state.patients,
        },
      };
    case "ADD_PATIENT":
      return {
        ...state,
        patients: {
          ...state.patients,
          [action.payload.id]: action.payload,
        },
      };
    case "ADD_ENTRY":
      const patient = state.patients[action.payload.patientId];
      return {
        ...state,
        patients: {
          ...state.patients,
          [action.payload.patientId]: {
            ...patient,
            entries: patient.entries
              ? [...patient.entries, action.payload.entry]
              : [action.payload.entry],
          },
        },
      };
    case "SET_DIAGNOSIS_LIST":
      return {
        ...state,
        diagnoses: {
          ...action.payload.reduce(
            (memo, diagnosis) => ({ ...memo, [diagnosis.code]: diagnosis }),
            {}
          ),
          ...state.diagnoses,
        },
      };
    default:
      return state;
  }
};
