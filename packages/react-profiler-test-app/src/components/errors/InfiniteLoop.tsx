import { useState } from 'react';

const InfiniteLoop = () => {
  const [count, setCount] = useState(0);

  // Nieskończona pętla renderowania
  setCount(count + 1); 

  return <div>Nieskończona pętla! Licznik: {count}</div>;
};

export default InfiniteLoop;
