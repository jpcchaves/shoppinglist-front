export const formalizeDate = (rawDate: string) => {
  return new Date(rawDate);
};

export const formatDate = (date: string) => {
  const options = { timeZone: "America/Sao_Paulo" };
  const formalizedDate = formalizeDate(date);
  return formalizedDate.toLocaleDateString("pt-BR", options);
};
