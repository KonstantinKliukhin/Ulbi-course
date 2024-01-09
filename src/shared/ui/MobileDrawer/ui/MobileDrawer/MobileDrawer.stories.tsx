import { type ComponentProps, type ReactNode } from 'react';
import { type Meta, type StoryObj } from '@storybook/react';
import { MobileDrawer } from './MobileDrawer';
import { Button } from '../../../Button/Button';
import { Text } from '../../../Text/Text';
import { useBoolState } from '../../../../lib/utils/useBoolState/useBoolState';

export default {
  title: 'shared/MobileDrawer',
  component: MobileDrawer,
} as Meta<ComponentProps<typeof MobileDrawer>>;

type DrawerFirstStory = StoryObj<typeof MobileDrawer>;

interface Props {
  children: ReactNode;
}

function DrawerExample ({ children, }: Props) {
  const drawerState = useBoolState();

  return (
    <div style={{ padding: 40, }}>
      <Button theme="outline" onClick={drawerState.toggle}>
        {drawerState.boolState ? 'Close' : 'Open'}
      </Button>
      <MobileDrawer
        header={<Text title="Drag to close"/>}
        open={drawerState.boolState}
        onClose={drawerState.disable}
      >
        {children}
      </MobileDrawer>
    </div>
  );
}

export const Default: DrawerFirstStory = {
  render: () => (
    <DrawerExample>
      <p style={{ lineHeight: 2, }}>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum ac
        mauris sit amet diam pulvinar vestibulum. Sed malesuada ultrices
        hendrerit.
      </p>

      <p style={{ lineHeight: 2, }}>
        Class aptent taciti sociosqu ad litora torquent per conubia nostra, per
        inceptos himenaeos. Nam nisi tortor, egestas volutpat tortor auctor,
        efficitur molestie urna. Vestibulum blandit erat massa, eu ornare diam
        porttitor at.
      </p>
      <p style={{ lineHeight: 2, }}>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum ac
        mauris sit amet diam pulvinar vestibulum. Sed malesuada ultrices
        hendrerit.
      </p>
      <p style={{ lineHeight: 2, }}>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum ac
        mauris sit amet diam pulvinar vestibulum. Sed malesuada ultrices
        hendrerit.
      </p>
      <p style={{ lineHeight: 2, }}>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum ac
        mauris sit amet diam pulvinar vestibulum. Sed malesuada ultrices
        hendrerit.
      </p>
      <p style={{ lineHeight: 2, }}>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum ac
        mauris sit amet diam pulvinar vestibulum. Sed malesuada ultrices
        hendrerit.
      </p>
      <p style={{ lineHeight: 2, }}>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum ac
        mauris sit amet diam pulvinar vestibulum. Sed malesuada ultrices
        hendrerit.
      </p>
      <p style={{ lineHeight: 2, }}>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum ac
        mauris sit amet diam pulvinar vestibulum. Sed malesuada ultrices
        hendrerit.
      </p>

      <p style={{ lineHeight: 2, }}>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum ac
        mauris sit amet diam pulvinar vestibulum. Sed malesuada ultrices
        hendrerit.
      </p>
      <p style={{ lineHeight: 2, }}>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum ac
        mauris sit amet diam pulvinar vestibulum. Sed malesuada ultrices
        hendrerit.
      </p>
      <p style={{ lineHeight: 2, }}>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum ac
        mauris sit amet diam pulvinar vestibulum. Sed malesuada ultrices
        hendrerit.
      </p>
      <p style={{ lineHeight: 2, }}>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum ac
        mauris sit amet diam pulvinar vestibulum. Sed malesuada ultrices
        hendrerit.
      </p>
      <p style={{ lineHeight: 2, }}>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum ac
        mauris sit amet diam pulvinar vestibulum. Sed malesuada ultrices
        hendrerit.
      </p>
      <p style={{ lineHeight: 2, }}>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum ac
        mauris sit amet diam pulvinar vestibulum. Sed malesuada ultrices
        hendrerit.
      </p>
    </DrawerExample>
  ),
};
