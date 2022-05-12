import { Box, Typography } from "@material-ui/core";
import WorkIcon from "@mui/icons-material/Work";
import { useStateValue } from "../state";
import { OccupationalHealthcareEntry } from "../types";

interface Props {
  entry: OccupationalHealthcareEntry;
}

const OccupationalHealthcareEntryDetails = ({ entry }: Props) => {
  const [{ diagnoses }] = useStateValue();

  return (
    <Box
      sx={{
        border: "2px solid black",
        borderRadius: 5,
        padding: 10,
        marginBottom: 10,
      }}
    >
      <Typography variant="body1" component="div">
        <div>
          {entry.date} <WorkIcon /> {entry.employerName}
        </div>
        {entry.diagnosisCodes && entry.diagnosisCodes.length !== 0 && (
          <ul>
            {entry.diagnosisCodes.map((code) => (
              <li key={code}>
                {code} {diagnoses[code]?.name}
              </li>
            ))}
          </ul>
        )}
        <p style={{ fontStyle: "italic" }}>{entry.description}</p>
        {entry.sickLeave && (
          <p>
            Sick leave: {entry.sickLeave.startDate} / {entry.sickLeave.endDate}
          </p>
        )}
        <div>Diagnose by {entry.specialist}</div>
      </Typography>
    </Box>
  );
};

export default OccupationalHealthcareEntryDetails;
