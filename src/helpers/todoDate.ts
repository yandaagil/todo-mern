export const dueDate = (dueDate: string) => {
  const today = new Date();
  const due = new Date(dueDate);

  today.setHours(0, 0, 0, 0);
  due.setHours(0, 0, 0, 0);

  const timeDifference = due.getTime() - today.getTime();
  const dayDifference = timeDifference / (1000 * 60 * 60 * 24);
  return dayDifference;
};
