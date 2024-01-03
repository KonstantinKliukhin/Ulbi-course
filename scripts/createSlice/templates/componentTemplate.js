const interfaceConst = 'interface';

module.exports = (componentName) => `import { classNames } from 'shared/lib';
import cls from './${componentName}.module.scss';
import { memo } from 'react';

${interfaceConst} ${componentName}Props {
    className?: string;
}

export const ${componentName} = memo<${componentName}Props>((props) => {
    
    return (
        <div className={classNames(cls.${componentName}, {}, [props.className])}>
           
        </div>
    );
});`;
