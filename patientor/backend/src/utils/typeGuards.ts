import { Gender } from "../../types";

export const isString = (text: unknown): text is string => {
  return typeof text === "string" || text instanceof String;
};

export const isDate = (date: unknown): date is string => {
  return isString(date) && Boolean(Date.parse(date));
};

export const isGender = (gender: unknown): gender is Gender => {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-argument, @typescript-eslint/no-explicit-any
  return Object.values(Gender).includes(gender as any);
};
