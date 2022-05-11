import { CoursePart } from "../types";
import assertNever from "../utils/assertNever";
import styles from "./styles.module.css";

interface Props {
  part: CoursePart;
}

const Part = ({ part }: Props) => {
  switch (part.type) {
    case "normal":
      return (
        <div className={styles.part}>
          <span className={styles.part__name}>
            {part.name} {part.exerciseCount}
          </span>
          <span className={styles.part__description}>{part.description}</span>
        </div>
      );
    case "groupProject":
      return (
        <div className={styles.part}>
          <span className={styles.part__name}>
            {part.name} {part.exerciseCount}
          </span>
          <span>project exercises {part.groupProjectCount}</span>
        </div>
      );
    case "submission":
      return (
        <div className={styles.part}>
          <span className={styles.part__name}>
            {part.name} {part.exerciseCount}
          </span>
          <span className={styles.part__description}>{part.description}</span>
          <span>submit to {part.exerciseSubmissionLink}</span>
        </div>
      );
    case "special":
      return (
        <div className={styles.part}>
          <span className={styles.part__name}>
            {part.name} {part.exerciseCount}
          </span>
          <span className={styles.part__description}>{part.description}</span>
          <span>required skills: {part.requirements.join(", ")}</span>
        </div>
      );
    default:
      return assertNever(part);
  }
};

export default Part;
