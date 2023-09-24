export const replaceDot = (valueWithDot: string): string => {
  return valueWithDot.replace(".", ",");
}

export const replaceSemiColon = (valueWithSemiColon: string): string => {
  return valueWithSemiColon.replace(",", ".");
}

export const formatCurrency = (rawValue: string | undefined): string => {
    const rawValueNumber =  Number(rawValue);

    const formattedValue = rawValueNumber.toFixed(2);
    const [wholePart, decimalPart] = formattedValue.split('.');
    const formattedWholePart = wholePart.replace(/\B(?=(\d{3})+(?!\d))/g, ',');

    return `R$ ${formattedWholePart},${decimalPart}`;

}


