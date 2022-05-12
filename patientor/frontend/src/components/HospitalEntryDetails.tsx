import { Box, Typography } from "@material-ui/core";
import LocalHospitalIcon from "@mui/icons-material/LocalHospital";
import { useStateValue } from "../state";
import { HospitalEntry } from "../types";

interface Props {
  entry: HospitalEntry;
}

const HospitalEntryDetails = ({ entry }: Props) => {
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
          {entry.date} <LocalHospitalIcon />
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
        <p>
          Discharge: {entry.discharge.date} {entry.discharge.criteria}
        </p>
        <div>Diagnose by {entry.specialist}</div>
      </Typography>
    </Box>
  );
};

export default HospitalEntryDetails;
