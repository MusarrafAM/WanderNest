export const formatCurrency = (amount: number | null) => {
  const value = amount || 0;
  return new Intl.NumberFormat("en-US", {
    // creating new international currency number formate
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 0, // No fractions front and back.
    maximumFractionDigits: 0,
  }).format(value);
};
