export const date = (date: string): string => {
  const newDate = new Date(date);
  const formattedDate = newDate.toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });

  return formattedDate;
};
