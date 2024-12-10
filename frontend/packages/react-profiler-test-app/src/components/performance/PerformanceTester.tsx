import { useState, useEffect, memo, FC } from "react";

const TestComponent: FC = memo(() => {
  return <div>Test Component</div>;
});

type PerformanceResults = {
  stateChangeTime?: number;
  propsChangeTime?: number;
  renderTime?: number;
};

type PerformanceTesterProps = {
  propToChange: number;
  setPropToChange: (value: number) => void;
};

export const PerformanceTester: FC<PerformanceTesterProps> = ({
  propToChange,
  setPropToChange,
}) => {
  const [state, setState] = useState(0);
  const [results, setResults] = useState<PerformanceResults>({});

  const measurePerformance = (
    action: string,
    iterations: number,
    fn: () => void
  ) => {
    const start = performance.now();
    for (let i = 0; i < iterations; i++) {
      fn();
    }
    const end = performance.now();

    console.log(`${action} Time:`, end - start);
    return end - start;
  };

  useEffect(() => {
    const stateChangeTime = measurePerformance("State Change", 100000, () =>
      setState((prev) => prev + 1)
    );

    const propsChangeTime = measurePerformance("Props Change", 100000, () =>
      setPropToChange(propToChange + 1)
    );

    const renderTime = measurePerformance("Render", 100000, () => (
      <TestComponent key={Math.random()} />
    ));

    setResults({
      stateChangeTime: stateChangeTime,
      propsChangeTime: propsChangeTime,
      renderTime: renderTime,
    });
  }, []);

  return (
    <div>
      <h2>Performance Results</h2>
      <p>
        State ({state}) Change Time (100): {results.stateChangeTime || "N/A"} ms
      </p>
      <p>Props Change Time (100): {results.propsChangeTime || "N/A"} ms</p>
      <p>Render Time (100): {results.renderTime || "N/A"} ms</p>
      <p>Props: {propToChange}</p>
    </div>
  );
};
