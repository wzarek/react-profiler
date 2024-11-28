import React, {
  FC,
  ProfilerOnRenderCallback,
  PropsWithChildren,
  useRef,
} from 'react';
import { sendData } from '../utils/api';

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

    sendData({
      event_type: 'mount',
      location: id,
      time_taken: actualDuration,
      title: `Component ${id} rendered`,
      description: `Component ${id} rendered in ${actualDuration.toFixed(
        2
      )} ms, Phase: ${phase}`,
    });
  };

  return (
    <React.Profiler id="GlobalProfiler" onRender={onRender}>
      {children}
    </React.Profiler>
  );
};

export { ProfilingBoundary };
