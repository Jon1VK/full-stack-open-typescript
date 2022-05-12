import { Button, Typography } from "@material-ui/core";

import { Entry, Patient } from "../types";
import { addEntry, addPatient, useStateValue } from "../state";
import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { apiBaseUrl } from "../constants";
import axios from "axios";
import GenderIcon from "../components/GenderIcon";
import EntryDetails from "../components/EntryDetails";
import { EntryFormValues } from "../AddEntryModal/AddEntryForm";
import AddEntryModal from "../AddEntryModal";

interface Params {
  id: string;
}

const PatientPage = () => {
  const navigate = useNavigate();
  const { id } = useParams<keyof Params>() as Params;
  const [{ patients }, dispatch] = useStateValue();
  const patient: Patient = patients[id];

  useEffect(() => {
    if (!patient || !patient.ssn) {
      const fetchPatient = async () => {
        try {
          const { data: patientFromApi } = await axios.get<Patient>(
            `${apiBaseUrl}/patients/${id}`
          );
          dispatch(addPatient(patientFromApi));
        } catch (e) {
          console.error(e);
          navigate("/");
        }
      };
      void fetchPatient();
    }
  }, [dispatch, id]);

  const [modalOpen, setModalOpen] = useState<boolean>(false);
  const [error, setError] = useState<string>();

  const openModal = (): void => setModalOpen(true);

  const closeModal = (): void => {
    setModalOpen(false);
    setError(undefined);
  };

  const submitNewEntry = async (values: EntryFormValues) => {
    try {
      const { data: newEntry } = await axios.post<Entry>(
        `${apiBaseUrl}/patients/${id}/entries`,
        values
      );
      dispatch(addEntry(patient.id, newEntry));
      closeModal();
    } catch (e: unknown) {
      if (axios.isAxiosError(e)) {
        console.error(e?.response?.data || "Unrecognized axios error");
        setError(
          String(e?.response?.data?.error) || "Unrecognized axios error"
        );
      } else {
        console.error("Unknown error", e);
        setError("Unknown error");
      }
    }
  };

  if (!patient) {
    return (
      <div className="App">
        <Typography variant="h4" gutterBottom style={{ marginTop: "1em" }}>
          Loading
        </Typography>
      </div>
    );
  }

  return (
    <div className="App">
      <Typography variant="h4" gutterBottom style={{ marginTop: "1em" }}>
        {patient.name} <GenderIcon gender={patient.gender} />
      </Typography>
      <Typography variant="body1">ssn: {patient.ssn}</Typography>
      <Typography variant="body1">occupation: {patient.occupation}</Typography>
      {patient.entries && patient.entries.length !== 0 && (
        <>
          <Typography variant="h5" gutterBottom style={{ marginTop: "1em" }}>
            Entries
          </Typography>
          {patient.entries.map((entry) => (
            <EntryDetails key={entry.id} entry={entry} />
          ))}
        </>
      )}

      <AddEntryModal
        modalOpen={modalOpen}
        onSubmit={submitNewEntry}
        error={error}
        onClose={closeModal}
      />
      <Button variant="contained" onClick={() => openModal()}>
        Add New Entry
      </Button>
    </div>
  );
};

export default PatientPage;
