export const replaceDot = (valueWithDot: string): string => {
  return valueWithDot.replace(".", ",");
}

export const replaceSemiColon = (valueWithSemiColon: string): string => {
  return valueWithSemiColon.replace(",", ".");
}

export const formatCurrency = (rawValue: string | undefined): string => {
  const BRL = new Intl.NumberFormat("pt-BR", {
    style: "currency",
    currency: "BRL",
  });

  return BRL.format(Number(rawValue));
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


