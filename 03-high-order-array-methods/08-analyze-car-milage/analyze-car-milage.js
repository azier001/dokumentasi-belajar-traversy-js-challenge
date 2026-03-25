function analyzeCarMileage(cars) {
  const totalMileage = cars.reduce((total, { mileage }) => total + mileage, 0);
  const averageMileage = totalMileage / cars.length;
  const roundedAverageMileage = Math.round(averageMileage * 100) / 100;

  const highestMileageCar = cars.reduce((max, current) => {
    return current.mileage > max.mileage ? current : max;
  });

  const lowestMileageCar = cars.reduce((min, current) => {
    return current.mileage < min.mileage ? current : min;
  });

  return {
    averageMileage: roundedAverageMileage,
    highestMileageCar,
    lowestMileageCar,
    totalMileage,
  };
}

const cars = [
  { make: 'Toyota', model: 'Corolla', year: 2020, mileage: 25000 },
  { make: 'Honda', model: 'Civic', year: 2019, mileage: 30000 },
  { make: 'Ford', model: 'Mustang', year: 2021, mileage: 15000 },
];

const analysis = analyzeCarMileage(cars);
console.log(analysis);
// Output:
// {
//   averageMileage: 23333.33,
//   highestMileageCar: { make: "Honda", model: "Civic", year: 2019, mileage: 30000 },
//   lowestMileageCar: { make: "Ford", model: "Mustang", year: 2021, mileage: 15000 },
//   totalMileage: 70000
// }

module.exports = analyzeCarMileage;
