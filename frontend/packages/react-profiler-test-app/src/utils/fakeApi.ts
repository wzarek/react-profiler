export const randomDelay = () => {
  const baseDelay = Math.floor(Math.random() * (500 - 100 + 1)) + 80;
  const isHighLatency = Math.random() < 0.1;
  const isError = Math.random() < 0.15;
  const highLatencyDelay = Math.floor(Math.random() * (1500 - 1000 + 1)) + 500;
  const delay = isHighLatency ? highLatencyDelay : baseDelay;

  return { delay, isError };
};
