import React, {
  FC,
  ProfilerOnRenderCallback,
  PropsWithChildren,
  useRef,
} from 'react';

const ProfilingBoundary: FC<PropsWithChildren> = ({ children }) => {
  const renders = useRef<Record<string, { count: number }>>({});

  const onRender: ProfilerOnRenderCallback = (id, phase, actualDuration) => {
    if (!renders.current[id]) {
      renders.current[id] = { count: 0 };
    }
    renders.current[id].count += 1;
    console.log(
      `[Profiling] Component ${id} rendered in ${actualDuration.toFixed(
        2
      )} ms, Phase: ${phase}`
    );
  };

  return (
    <React.Profiler id="GlobalProfiler" onRender={onRender}>
      {children}
    </React.Profiler>
  );
};

export { ProfilingBoundary };
