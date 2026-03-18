function calculateTotalSalesWithTax(products, taxRate) {
  const totalSales = products.reduce(
    (total, { price, quantity }) => total + price * quantity,
    0,
  );

  const totalSalesWithTax = totalSales + (totalSales * taxRate) / 100;

  return Number(totalSalesWithTax.toFixed(2));
}

const result = calculateTotalSalesWithTax(
  [
    { name: 'Apple', price: 0.5, quantity: 10 },
    { name: 'Banana', price: 0.3, quantity: 20 },
    { name: 'Orange', price: 0.6, quantity: 15 },
  ],
  8,
); // 21.6 (20 + 8% tax)

console.log(result);

module.exports = calculateTotalSalesWithTax;
