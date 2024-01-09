import { type StateSchema } from '@/app/providers/StoreProvider';
import {
  getBlockFormMode,
  getCurrentBlockIndex,
  getEditingArticleBlock
} from './getManageArticleState';
import { mockedArticleTextBlock } from '@/shared/mocks';

describe('getManageArticleState', () => {
  test('getBlockFormMode should work with empty state', () => {
    const mockedState: DeepPartial<StateSchema> = {};

    expect(getBlockFormMode(mockedState as StateSchema)).toBe('none');
  });

  test('getBlockFormMode should return block form mode state', () => {
    const mockedState: DeepPartial<StateSchema> = {
      manageArticle: {
        blockFormMode: 'edit',
      },
    };

    expect(getBlockFormMode(mockedState as StateSchema)).toBe('edit');
  });

  test('getEditingArticleBlock should work with empty state', () => {
    const mockedState: DeepPartial<StateSchema> = {};

    expect(getEditingArticleBlock(mockedState as StateSchema)).toBe(null);
  });

  test('getEditingArticleBlock should return editing article block state', () => {
    const mockedState: DeepPartial<StateSchema> = {
      manageArticle: {
        editingArticleBlock: mockedArticleTextBlock,
      },
    };

    expect(getEditingArticleBlock(mockedState as StateSchema)).toEqual(
      mockedArticleTextBlock
    );
  });

  test('getCurrentBlockIndex should work with empty state', () => {
    const mockedState: DeepPartial<StateSchema> = {};

    expect(getCurrentBlockIndex(mockedState as StateSchema)).toBe(-1);
  });

  test('getCurrentBlockIndex should return current block index state', () => {
    const mockedState: DeepPartial<StateSchema> = {
      manageArticle: {
        currentBlockIndex: 1,
      },
    };

    expect(getCurrentBlockIndex(mockedState as StateSchema)).toBe(1);
  });
});
