export const formatText = (text: string | undefined) => {
  if (!text) return;

  // Guardamos el resultado
  const formatted = text.split(".").slice(0, -1).join(".");
  return formatted;
};
