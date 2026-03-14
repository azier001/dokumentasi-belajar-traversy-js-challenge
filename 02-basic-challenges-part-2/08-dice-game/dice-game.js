function diceGameSimulation(numSimulations) {
  const results = [];

  for (let i = 0; i < numSimulations; i++) {
    const dice1 = Math.floor(Math.random() * 6 + 1);
    const dice2 = Math.floor(Math.random() * 6 + 1);
    const sum = dice1 + dice2;

    let result = '';
    if (sum === 7 || sum === 11) {
      result = 'win';
    } else if (sum === 2 || sum === 3 || sum === 12) {
      result = 'lose';
    } else {
      result = 'roll again';
    }

    const report = {
      dice1,
      dice2,
      sum,
      result,
    };

    results.push(report);
  }

  return results;
}

console.log(diceGameSimulation(3));
/*
  { dice1: 1, dice2: 5, sum: 6, result: 'roll again' },
  { dice1: 5, dice2: 6, sum: 11, result: 'win' },
  { dice1: 1, dice2: 1, sum: 2, result: 'lose' }
*/

module.exports = diceGameSimulation;
