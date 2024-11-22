import { useEffect, useState } from 'react';

const SlowRender = () => {
  const [data, setData] = useState<string | null>(null);

  useEffect(() => {
    const randomDelay = Math.floor(Math.random() * 10000) + 1000;
    const timer = setTimeout(() => {
      setData(`Dane załadowane po ${randomDelay / 1000} sekundach!`);
    }, randomDelay);
    
    return () => clearTimeout(timer);
  }, []);

  return (
    <div>
      {data ?? "Ładowanie danych..."}
    </div>
  );
};

export default SlowRender;
