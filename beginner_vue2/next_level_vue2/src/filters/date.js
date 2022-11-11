export const formatDate = (value) => {
  const date = new Date(value);
  return date.toLocaleString(['nl'], {
    month: 'short',
    day: '2-digit',
    year: 'numeric',
  });
};
