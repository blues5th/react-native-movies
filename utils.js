export const trimText = (text, limit) =>
  text.length > limit ? `${text.slice(0, limit)}...` : text;

export const formatDate = (date) => {
  const theDate = new Date(date);
  return theDate.toLocaleDateString("ja", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
};

export const sortItem = (item) => {
  if (!item) {
    return;
  }
  item.sort((a, b) => {
    return a.startTime.localeCompare(b.startTime);
  });
};
