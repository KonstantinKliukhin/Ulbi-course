declare module "*.scss" {
    interface IClassName {
        [className: string]: string;
    }

    const classNames: IClassName;
    export = classNames;
}