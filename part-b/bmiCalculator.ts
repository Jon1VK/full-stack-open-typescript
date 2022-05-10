function calculateBmi(height: number, weight: number) {
  const bmi = weight / (height / 100) ** 2;

  if (bmi < 18.5) {
    return "Underweight (unhealthy weight)";
  }

  if (bmi > 24.9) {
    return "Overweight (unhealthy weight)";
  }

  return "Normal (healthy weight)";
}

function parseArguments(args: unknown[]) {
  if (args.length !== 2) {
    throw new Error("parameters missing");
  }

  const height = Number(args[0]);
  const weight = Number(args[1]);

  if (isNaN(height) || isNaN(weight)) {
    throw new Error("malformatted parameters");
  }

  return {
    height,
    weight,
  };
}

const bmiCalculator = {
  calculateBmi,
  parseArguments,
};

export default bmiCalculator;

// const { height, weight } = parseArguments(process.argv.slice(2));
// console.log(calculateBmi(height, weight));
