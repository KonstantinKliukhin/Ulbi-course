import { type FC, useContext } from 'react';
import { StoreProvider } from 'app/providers/StoreProvider';
import {
  OptionalDecoratorsContext
} from 'shared/config/storybook/OptionalDecoratorsDecorator/OptionalDecoratorsProvider';

export const GlobalStoreDecorator = (Story: FC) => {
  const isCustomStore = useContext(OptionalDecoratorsContext).isCustomReduxStore;

  if (isCustomStore) return <Story/>;

  return (
    <StoreProvider>
      <Story/>
    </StoreProvider>
  );
};
