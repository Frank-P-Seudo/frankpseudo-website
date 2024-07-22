function formatDate(date) {
  const year = date.getFullYear();
  const month = (date.getMonth() + 1).toString().padStart(2, "0");
  const day = date.getDate().toString().padStart(2, "0");
  return `${year}-${month}-${day}`;
}

function capitalize(word = "") {
  if (!word) return "";

  return word[0].toUpperCase() + word.slice(1);
}

export { formatDate, capitalize };
