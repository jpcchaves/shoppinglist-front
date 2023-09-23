export const replaceDot = (valueWithDot: string): string => {
  return valueWithDot.replace(".", ",");
}

export const formatCurrency = (rawValue: string | undefined): string => {
    return `R$ ${rawValue}`;
}


