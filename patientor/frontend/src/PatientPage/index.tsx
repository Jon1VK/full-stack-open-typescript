import { Typography } from "@material-ui/core";

import { Patient } from "../types";
import { addPatient, useStateValue } from "../state";
import { useNavigate, useParams } from "react-router-dom";
import { useEffect } from "react";
import { apiBaseUrl } from "../constants";
import axios from "axios";
import GenderIcon from "../components/GenderIcon";
import EntryDetails from "../components/EntryDetails";

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
    </div>
  );
};

export default PatientPage;
