// eslint-disable-next-line @typescript-eslint/naming-convention
declare const __IS_DEV__: boolean;

// eslint-disable-next-line @typescript-eslint/consistent-type-imports
type StateSchema = import('../providers/StoreProvider').StateSchema;
// eslint-disable-next-line @typescript-eslint/consistent-type-imports
type AppDispatch = import('../providers/StoreProvider').AppDispatch;

declare type Url = string;

declare module '*.scss' {
    type IClassName = Record<string, string>;

    const classNames: IClassName;
    export = classNames;
}

declare module '*.svg' {
  import type React from 'react';
  const content: React.FunctionComponent<React.SVGAttributes<SVGElement>>;
  export default content;
}

declare module '*.png' {
  const content: string;
  export default content;
}

declare module '*.jpg' {
  const content: string;
  export default content;
}
