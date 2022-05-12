import { Discharge, EntryType, Gender, HealthCheckRating } from "../types";

export const isString = (value: unknown): value is string => {
  return typeof value === "string" || value instanceof String;
};

export const isObject = (value: unknown): value is Record<string, unknown> => {
  return value instanceof Object;
};

export const isDate = (value: unknown): value is string => {
  return isString(value) && Boolean(Date.parse(value));
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const isGender = (value: any): value is Gender => {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
  return Object.values(value).includes(value);
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const isEntryType = (value: any): value is EntryType => {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
  return Object.values(EntryType).includes(value);
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const isHealthCheckRating = (value: any): value is HealthCheckRating => {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
  return Object.values(HealthCheckRating).includes(value);
};

export const isDischarge = (value: unknown): value is Discharge => {
  return isObject(value) && isString(value.date) && isString(value.criteria);
};
