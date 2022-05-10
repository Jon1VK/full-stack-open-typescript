import express from "express";
import bmiCalculator from "./bmiCalculator";
import exerciseCalculator from "./exerciseCalculator";
const app = express();

app.use(express.json());

app.get("/hello", (_req, res) => {
  res.send("Hello Full Stack!");
});

app.get("/bmi", (req, res) => {
  try {
    const { height, weight } = req.query;
    const args = bmiCalculator.parseArguments([height, weight]);
    const bmi = bmiCalculator.calculateBmi(args.height, args.weight);
    res.json({
      weight,
      height,
      bmi,
    });
  } catch (error: unknown) {
    res.status(400).json({
      error: "malformatted parameters",
    });
  }
});

app.post("/exercises", (req, res) => {
  try {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    const { target, daily_exercises } = req.body;
    const args = exerciseCalculator.parseArguments([
      target,
      // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
      ...daily_exercises,
    ]);
    const result = exerciseCalculator.calculateExercises(
      args.hours,
      args.target
    );
    res.json(result);
  } catch (error: unknown) {
    if (error instanceof Error) {
      res.status(400).json({
        error: error.message,
      });
    }
    res.status(400).json({
      error: "Something went wrong",
    });
  }
});

const PORT = 3003;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
