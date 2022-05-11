import { Box, Typography } from "@material-ui/core";
import MedicalServicesIcon from "@mui/icons-material/MedicalServices";
import { useStateValue } from "../state";
import { HealthCheckEntry } from "../types";
import HealthRatingBar from "./HealthRatingBar";

interface Props {
  entry: HealthCheckEntry;
}

const HealthCheckEntryDetails = ({ entry }: Props) => {
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
          {entry.date} <MedicalServicesIcon />
        </div>
        {entry.diagnosisCodes && entry.diagnosisCodes.length !== 0 && (
          <ul>
            {entry.diagnosisCodes.map((code) => (
              <li key={code}>
                {code} {diagnoses[code].name}
              </li>
            ))}
          </ul>
        )}
        <p style={{ fontStyle: "italic" }}>{entry.description}</p>
        <HealthRatingBar rating={entry.healthCheckRating} showText={true} />
        <div>Diagnose by {entry.specialist}</div>
      </Typography>
    </Box>
  );
};

export default HealthCheckEntryDetails;
