export const formalizeDate = (rawDate: string) => {
  return new Date(rawDate);
}

export const formatDate = (date: Date) => {
  const options = {timeZone: 'America/Sao_Paulo'};
  return date.toLocaleDateString('pt-BR', options);
}
