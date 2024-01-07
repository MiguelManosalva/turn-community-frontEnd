export const formatDate = (dateString: Date) => {
  if (!dateString) return "-";

  const date = new Date(dateString);
  return date.toLocaleDateString("es-ES", {
    weekday: "long",
    day: "2-digit",
    month: "long",
    year: "numeric",
  });
};
