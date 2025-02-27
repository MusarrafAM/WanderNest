// eg result of this formatCurrency =  $941
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

// eg result of this formatDate = February 12, 2025
export const formatDate = (date: Date, onlyMonth?: boolean) => {
  const options: Intl.DateTimeFormatOptions = {
    year: "numeric",
    month: "long",
  };

  // if onlyMonth prop provided day will not be added to the return
  if (!onlyMonth) {
    options.day = "numeric";
  }

  return new Intl.DateTimeFormat("en-US", options).format(date);
};

export function formatQuantity(quantity: number, noun: string): string {
  return quantity === 1 ? `${quantity} ${noun}` : `${quantity} ${noun}s`;
}
