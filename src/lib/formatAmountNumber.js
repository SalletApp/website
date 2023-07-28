export default function (value) {
  // Convert the value to a number with two decimal places
  const formattedValue = parseFloat(value).toFixed(2);

  // Separate the integer part from the decimal part
  const [integerPart, decimalPart] = formattedValue.split('.');

  // Add thousand separators
  const formattedIntegerPart = integerPart.replace(/\B(?=(\d{3})+(?!\d))/g, ',');

  // Combine the formatted integer and decimal parts with a comma as the separator
  return `${formattedIntegerPart}.${decimalPart}`;
}
