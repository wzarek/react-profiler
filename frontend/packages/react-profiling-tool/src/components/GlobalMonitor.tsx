import React, {
  Children,
  cloneElement,
  FC,
  isValidElement,
  PropsWithChildren,
  ReactNode,
  useMemo,
} from 'react';
import { sendData } from '../utils/api';
import { Monitor } from './Monitor';
import SessionDataProvider from './SessionDataProvider';

export const handlePropChange = (
  propsChange: Record<string, any>,
  duration: number,
  componentName: string
) => {
  console.log(
    `[${new Date(Date.now()).toLocaleString()}][Profiler] Props changed:`,
    propsChange,
    `in ${duration.toFixed(3)} ms`
  );

  sendData({
    event_type: 'update',
    location: componentName,
    time_taken: duration,
    title: `Component ${componentName} updated`,
    description: `Props changed: ${JSON.stringify(propsChange)}`,
  });
};

export const handleMount = (componentName: string) => {
  console.log(
    `[${new Date(
      Date.now()
    ).toLocaleString()}][Profiler] ${componentName} mounted`
  );

  sendData({
    event_type: 'mount',
    location: componentName,
    time_taken: 0,
    title: `Component ${componentName} mounted`,
    description: `${componentName} mounted`,
  });
};

export const handleUnmount = (componentName: string) => {
  console.log(
    `[${new Date(
      Date.now()
    ).toLocaleString()}][Profiler] ${componentName} unmounted`
  );

  sendData({
    event_type: 'unmount',
    location: componentName,
    time_taken: 0,
    title: `Component ${componentName} unmounted`,
    description: `${componentName} unmounted`,
  });
};

const GlobalMonitor: FC<PropsWithChildren> = ({ children }) => {
  const wrapWithMonitor = (child: ReactNode, componentName: string) => {
    if (isValidElement(child)) {
      return (
        <Monitor
          componentName={componentName}
          onPropsChange={handlePropChange}
          onMount={handleMount}
          onUnmount={handleUnmount}
        >
          {cloneElement(child, { key: componentName })}
        </Monitor>
      );
    }
    return child;
  };

  const traverseAndWrap = (children: ReactNode): ReactNode => {
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

      if (props?.children) {
        children = cloneElement(
          children,
          children.props,
          Children.map(children, child => traverseAndWrap(child))
        );
      }
    }

    return wrapWithMonitor(children, name);
  };

  const wrappedChildren = useMemo(
    () => Children.map(children, child => traverseAndWrap(child)),
    [children]
  );

  return <SessionDataProvider>{wrappedChildren}</SessionDataProvider>;
};

export { GlobalMonitor };
