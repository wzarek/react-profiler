import React from 'react';
import {
  Children,
  FC,
  isValidElement,
  ReactNode,
  useEffect,
  useRef,
} from 'react';

type MonitorProps = {
  componentName: string;
  children: ReactNode;
  onRenderData: (propsChange: any, renderDuration: number) => void;
};

const Monitor: FC<MonitorProps> = ({
  componentName,
  children,
  onRenderData,
}) => {
  const previousProps = useRef<any>(children);
  const startRender = useRef<number>(0);

  useEffect(() => {
    if (previousProps.current !== children) {
      Children.forEach(children, child => {
        if (isValidElement(child)) {
          Object.keys(child.props).forEach(key => {
            if (previousProps.current.props[key] !== child.props[key]) {
              const change = {
                componentName: componentName,
                propName: key,
                from: previousProps.current.props[key],
                to: child.props[key],
              };
              console.log(change);
              onRenderData(change, performance.now() - startRender.current);
            }
          });
        }
      });
    }
    previousProps.current = children;
    startRender.current = performance.now();
  }, [children, onRenderData]);

  return <>{children}</>;
};

export { Monitor };
