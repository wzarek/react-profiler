import React, {
  cloneElement,
  FC,
  isValidElement,
  Profiler,
  ReactNode,
  useMemo,
} from 'react';
import { PropsWithChildren } from 'react';
import { Monitor } from './Monitor';

const GlobalPropsMonitor: FC<PropsWithChildren> = ({ children }) => {
  const handleRender = (id: string, phase: string, actualDuration: number) => {
    console.log(
      `[${new Date(
        Date.now()
      ).toLocaleString()}][Profiler] Component "${id}" rendered in ${actualDuration.toFixed(
        3
      )} ms, Phase: ${phase}`
    );
  };

  const handlePropChange = (
    propsChange: Record<string, any>,
    duration: number
  ) => {
    console.log(
      `[${new Date(Date.now()).toLocaleString()}][Profiler] Props changed:`,
      propsChange,
      `in ${duration.toFixed(3)} ms`
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

    let name = 'Unknown';

    if (typeof children === 'string' || typeof children === 'number') {
      return children;
    }

    if (isValidElement(children)) {
      const { type, props } = children;

      if (type === React.Fragment) {
        name = 'Fragment';
      }

      if (typeof type === 'function') {
        const typeComponentType = type as React.ComponentType;
        name =
          typeComponentType.displayName || typeComponentType.name || 'Unknown';
      }

      if (typeof type === 'string') {
        name = type;
      }

      if (props && props.children) {
        // todo: make key unique
        children = cloneElement(
          children,
          children.props,
          traverseAndWrap(props.children)
        );
      }
    }

    return wrapWithMonitor(children, name);
  };

  const wrappedChildren = useMemo(() => traverseAndWrap(children), [children]);

  return <>{wrappedChildren}</>;
};

export { GlobalPropsMonitor };
