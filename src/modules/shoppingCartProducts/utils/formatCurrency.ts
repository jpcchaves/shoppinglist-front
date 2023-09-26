export const replaceDot = (valueWithDot: string): string => {
  return valueWithDot.replace(".", ",");
}

export const replaceSemiColon = (valueWithSemiColon: string): string => {
  return valueWithSemiColon.replace(",", ".");
}

export const formatCurrency = (rawValue: string | undefined): string => {
    const rawValueNumber =  Number(rawValue);

    const formattedValue = rawValueNumber.toFixed(2);
    const [integerPart, decimalPart] = formattedValue.split('.');
    const replacedIntegerPart = integerPart.replace(/\B(?=(\d{3})+(?!\d))/g, '.');

    return `R$ ${replacedIntegerPart},${decimalPart}`;

}

export const removeCurrencyMask = (value: string): string => {
  let numericValue = value;

  if (value.includes("R$")) {
    numericValue = value.replace(/[^\d,]/g, "");
  }

  let cleanedValue = numericValue;

  if (numericValue.includes(",")) {
    cleanedValue = numericValue.replace(",", ".");
  }

  return cleanedValue;
};


