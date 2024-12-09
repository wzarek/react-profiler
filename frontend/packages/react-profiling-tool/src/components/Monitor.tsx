import React from 'react';
import {
  Children,
  FC,
  isValidElement,
  ReactNode,
  useEffect,
  useRef,
} from 'react';
import SessionDataProvider from './SessionDataProvider';
import { handleMount, handlePropChange, handleUnmount } from './GlobalMonitor';

type MonitorProps = {
  componentName: string;
  children: ReactNode;
  onPropsChange?: (
    propsChange: Record<string, any>,
    renderDuration: number,
    componentName: string
  ) => void;
  onMount?: (componentName: string) => void;
  onUnmount?: (componentName: string) => void;
};

const Monitor: FC<MonitorProps> = ({
  componentName,
  children,
  onPropsChange = handlePropChange,
  onMount = handleMount,
  onUnmount = handleUnmount,
}) => {
  const previousProps = useRef<any>(null);
  const mounted = useRef<boolean>(false);

  useEffect(() => {
    if (!mounted.current) {
      mounted.current = true;
      onMount(componentName);
      previousProps.current = children;
    }

    if (previousProps.current !== children) {
      Children.forEach(children, child => {
        if (isValidElement(child)) {
          Object.keys(child.props).forEach(key => {
            if (previousProps.current.props[key] !== child.props[key]) {
              const change = {
                propName: key,
                from: previousProps.current.props[key],
                to: child.props[key],
              };

              if (key === 'children') {
                change.from = previousProps.current.props[key].map(
                  (ch: any) => {
                    if (typeof ch === 'string') {
                      return ch;
                    }

                    return ch.type.name ?? ch.type ?? 'Unknown';
                  }
                );
                change.to = child.props[key].map((ch: any) => {
                  if (typeof ch === 'string') {
                    return ch;
                  }

                  return ch.name ?? ch.type ?? 'Unknown';
                });
              }

              onPropsChange(change, 0, componentName);
            }
          });
        }
      });
    }
    previousProps.current = children;
  }, [children, onPropsChange]);

  useEffect(() => {
    return () => {
      onUnmount(componentName);
      mounted.current = false;
    };
  }, []);

  return <SessionDataProvider>{children}</SessionDataProvider>;
};

export { Monitor };
