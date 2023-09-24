declare module "*.scss" {
    interface IClassName {
        [className: string]: string;
    }

    const classNames: IClassName;
    export = classNames;
}

declare module "*.svg" {
    import React from 'react';
    const content: React.FunctionComponent<React.SVGAttributes<SVGElement>>;
    export default content;
}

declare module "*.png" {
    const content: string;
    export default content;
}

declare module "*.jpg" {
    const content: string;
    export default content;
}

declare const __IS_DEV__: boolean;