export const date = (date: string): string => {
  let newDate = new Date(date);
  let formattedDate = newDate.toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });

  return formattedDate;
};
