import { Grid, Button } from "@material-ui/core";
import { Field, Formik, Form } from "formik";
import {
  TextField,
  DiagnosisSelection,
  SelectField,
  NumberField,
} from "../components/FormField";
import { useStateValue } from "../state";
import {
  EntryType,
  DistributiveOmit,
  Entry,
  UnionToIntersection,
  HealthCheckRating,
} from "../types";
import { isDate } from "../utils/typeGuards";

/*
 * use type HospitalEntry, but omit id,
 * because that is irrelevant for new entry object.
 */
export type EntryFormValues = UnionToIntersection<
  DistributiveOmit<Entry, "id" | "type"> & {
    type: EntryType;
  }
>;

interface Props {
  onSubmit: (values: EntryFormValues) => void;
  onCancel: () => void;
}

export const AddEntryForm = ({ onSubmit, onCancel }: Props) => {
  const [{ diagnoses }] = useStateValue();

  return (
    <Formik
      initialValues={{
        type: EntryType.Hospital,
        date: "",
        description: "",
        specialist: "",
        diagnosisCodes: [],
        discharge: {
          criteria: "",
          date: "",
        },
        employerName: "",
        healthCheckRating: HealthCheckRating.Healthy,
        sickLeave: {
          startDate: "",
          endDate: "",
        },
      }}
      onSubmit={onSubmit}
      validate={(values) => {
        const requiredError = "Field is required";
        const invalidDateError = "Invalid date";
        const errors: { [field: string]: string | Record<string, string> } = {};
        if (!isDate(values.date)) {
          errors.date = invalidDateError;
        }
        if (!values.date) {
          errors.date = requiredError;
        }
        if (!values.description) {
          errors.description = requiredError;
        }
        if (!values.specialist) {
          errors.specialist = requiredError;
        }
        switch (values.type) {
          case EntryType.Hospital:
            errors.discharge = {};
            if (!isDate(values.discharge.date)) {
              errors.discharge.date = invalidDateError;
            }
            if (!values.discharge.date) {
              errors.discharge.date = requiredError;
            }
            if (!values.discharge.criteria) {
              errors.discharge.criteria = requiredError;
            }
            if (Object.keys(errors.discharge).length === 0) {
              delete errors.discharge;
            }
            break;
          case EntryType.OccupationalHealthcare:
            errors.sickLeave = {};
            if (!values.employerName) {
              errors.employerName = requiredError;
            }
            if (values.sickLeave.startDate && !values.sickLeave.endDate) {
              errors.sickLeave.endDate = requiredError;
            }
            if (values.sickLeave.endDate && !values.sickLeave.startDate) {
              errors.sickLeave.startDate = requiredError;
            }
            if (
              values.sickLeave.startDate &&
              !isDate(values.sickLeave.startDate)
            ) {
              errors.sickLeave.startDate = invalidDateError;
            }
            if (values.sickLeave.endDate && !isDate(values.sickLeave.endDate)) {
              errors.sickLeave.endDate = invalidDateError;
            }
            if (Object.keys(errors.sickLeave).length === 0) {
              delete errors.sickLeave;
            }
            break;
        }
        return errors;
      }}
    >
      {({ isValid, dirty, setFieldValue, setFieldTouched, values }) => {
        return (
          <Form className="form ui">
            <SelectField
              label="Entry Type"
              name="type"
              options={Object.values(EntryType).map((entryType) => ({
                label: entryType,
                value: entryType,
              }))}
            />
            <Field
              label="Date"
              placeholder="YYYY-MM-DD"
              name="date"
              component={TextField}
            />
            {values.type === EntryType.OccupationalHealthcare && (
              <>
                <Field
                  label="Employer Name"
                  placeholder="Employer Name"
                  name="employerName"
                  component={TextField}
                />
              </>
            )}
            <Field
              name="diagnosisCodes"
              setFieldValue={setFieldValue}
              setFieldTouched={setFieldTouched}
              diagnoses={Object.values(diagnoses)}
              component={DiagnosisSelection}
            />
            <Field
              label="Description"
              placeholder="Description"
              name="description"
              component={TextField}
            />
            {values.type === EntryType.Hospital && (
              <>
                <Field
                  label="Discharge Date"
                  placeholder="YYYY-MM-DD"
                  name="discharge.date"
                  component={TextField}
                />
                <Field
                  label="Discharge Criteria"
                  placeholder="Discharge Criteria"
                  name="discharge.criteria"
                  component={TextField}
                />
              </>
            )}
            {values.type === EntryType.OccupationalHealthcare && (
              <>
                <Field
                  label="Sick Leave Start Date"
                  placeholder="YYYY-MM-DD"
                  name="sickLeave.startDate"
                  component={TextField}
                />
                <Field
                  label="Sick Leave End Date"
                  placeholder="YYYY-MM-DD"
                  name="sickLeave.endDate"
                  component={TextField}
                />
              </>
            )}
            {values.type === EntryType.HealthCheck && (
              <>
                <Field
                  label="Health Rating"
                  min={0}
                  max={3}
                  name="healthCheckRating"
                  setFieldValue={setFieldValue}
                  setFieldTouched={setFieldTouched}
                  component={NumberField}
                />
              </>
            )}
            <Field
              label="Specialist"
              placeholder="Specialist"
              name="specialist"
              component={TextField}
            />
            <Grid>
              <Grid item>
                <Button
                  color="secondary"
                  variant="contained"
                  style={{ float: "left" }}
                  type="button"
                  onClick={onCancel}
                >
                  Cancel
                </Button>
              </Grid>
              <Grid item>
                <Button
                  style={{
                    float: "right",
                  }}
                  type="submit"
                  variant="contained"
                  disabled={!dirty || !isValid}
                >
                  Add
                </Button>
              </Grid>
            </Grid>
          </Form>
        );
      }}
    </Formik>
  );
};

export default AddEntryForm;
