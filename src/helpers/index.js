export const formatTime = (date) => {
  const options = { hour: "numeric", minute: "numeric", hour12: true };
  return new Date(date).toLocaleTimeString("en-US", options);
};
