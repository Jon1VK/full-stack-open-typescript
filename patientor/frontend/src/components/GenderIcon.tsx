import MaleIcon from "@mui/icons-material/Male";
import FemaleIcon from "@mui/icons-material/Female";
import TransgenderIcon from "@mui/icons-material/Transgender";
import { Gender } from "../types";
import assertNever from "../utils/assertNever";

interface Props {
  gender: Gender;
}

const GenderIcon = ({ gender }: Props) => {
  switch (gender) {
    case Gender.Male:
      return <MaleIcon></MaleIcon>;
    case Gender.Female:
      return <FemaleIcon></FemaleIcon>;
    case Gender.Other:
      return <TransgenderIcon></TransgenderIcon>;
    default:
      return assertNever(gender);
  }
};

export default GenderIcon;
