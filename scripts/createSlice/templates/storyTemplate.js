module.exports = (layer, componentName) => `
import { type ComponentProps } from 'react';
import { type Meta, type StoryObj } from '@storybook/react';
import { ${componentName} } from './${componentName}';

export default {
  title: '${layer}/${componentName}',
  component: ${componentName},
} as Meta<ComponentProps<typeof ${componentName}>>;

type ${componentName}Story = StoryObj<typeof ${componentName}>;

export const Default: ${componentName}Story = {
    args: { }
};
`;


