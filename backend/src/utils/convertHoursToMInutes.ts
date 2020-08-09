export default (time: string) => {
  // 08:00

  const [hour, minute] = time.split(':').map(Number);

  return hour * 60 + minute;
};
