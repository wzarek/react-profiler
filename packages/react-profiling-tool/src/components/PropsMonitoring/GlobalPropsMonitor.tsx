import React, {
  cloneElement,
  FC,
  isValidElement,
  Profiler,
  ReactNode,
} from 'react';
import { PropsWithChildren } from 'react';
import { Monitor } from './Monitor';

const GlobalPropsMonitor: FC<PropsWithChildren> = ({ children }) => {
  const handleRender = (id: string, phase: string, actualDuration: number) => {
    console.log(
      `[Profiler] Component ${id} rendered in ${actualDuration.toFixed(
        2
      )} ms, Phase: ${phase}`
    );
  };

  const handlePropChange = (
    propsChange: Record<string, any>,
    duration: number
  ) => {
    console.log(
      `[Profiler] Props changed:`,
      propsChange,
      `in ${duration.toFixed(2)} ms`
    );
  };

  const wrapWithMonitor = (child: ReactNode, componentName: string) => {
    if (isValidElement(child)) {
      return (
        <Profiler id={componentName} onRender={handleRender}>
          <Monitor
            componentName={componentName}
            onRenderData={handlePropChange}
          >
            {cloneElement(child, { key: componentName })}
          </Monitor>
        </Profiler>
      );
    }
    return child;
  };

  const traverseAndWrap = (children: ReactNode): ReactNode => {
    if (Array.isArray(children)) {
      return children.map(child => traverseAndWrap(child));
    }
    return wrapWithMonitor(children, 'GlobalMonitor');
  };

  return <>{traverseAndWrap(children)}</>;
};

export { GlobalPropsMonitor };
