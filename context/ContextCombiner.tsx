import React, { ComponentProps, ReactElement } from 'react';

export const combineComponents = (...components: any[]): any => {
  return components.reduce(
    (AccumulatedComponents, CurrentComponent) => {
      // eslint-disable-next-line react/display-name
      return (obj: ComponentProps<any>): JSX.Element => {
        return (
          <AccumulatedComponents>
            <CurrentComponent>{obj.children}</CurrentComponent>
          </AccumulatedComponents>
        );
      };
    },
    (props: { children: ReactElement<any, any> }) => <>{props.children}</>
  );
};
