const ratingDescriptions = [
  "quite bad, could be much better",
  "not too bad but could be better",
  "good, keep up the good work",
];

function calculateExercises(hours: number[], target: number) {
  const periodLength = hours.length;
  const trainingDays = hours.reduce(
    (days, dailyHours) => (dailyHours > 0 ? days + 1 : days),
    0
  );
  const average = hours.reduce((prev, curr) => prev + curr) / hours.length;
  const success = average >= target;
  const rating = Math.min(1 + Math.floor((average / target) * 2), 3);
  const ratingDescription = ratingDescriptions[rating - 1];

  return {
    periodLength,
    trainingDays,
    success,
    rating,
    ratingDescription,
    target,
    average,
  };
}

function parseArguments(args: unknown[]) {
  if (args.length < 2) {
    throw new Error("parameters missing");
  }

  const target = Number(args[0]);
  const hours = args.slice(1).map(Number);

  if (isNaN(target) || hours.some(isNaN)) {
    throw new Error("malformatted parameters");
  }

  return {
    target,
    hours,
  };
}

const exerciseCalculator = {
  calculateExercises,
  parseArguments,
};

export default exerciseCalculator;

// const { target, hours } = parseArguments(process.argv.slice(2));
// console.log(calculateExercises(hours, target));
