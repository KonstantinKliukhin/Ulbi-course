import { formToArticleBlock } from './formToArticleBlock';
import { ArticleBlockType } from 'entities/Article';
import {
  mockedArticleCodeBlock,
  mockedArticleImageBlock,
  mockedArticleTextBlock
} from 'shared/mocks';
import { expect } from '@jest/globals';

describe('formToArticleBlock', () => {
  test('result id must be generated in function if no initialValue presenter', () => {
    const code = 'const s = 2';
    const name = 'name';
    const id = '123123';
    const { id: resultId, } = formToArticleBlock({
      id,
      type: ArticleBlockType.CODE,
      code,
      name,
    });

    expect(resultId).not.toBe(id);
    expect(typeof resultId).toBe('string');
  });

  test('result id must be taken from initialValue if presented', () => {
    const code = 'const s = 2';
    const name = 'name';
    const id = '123123';
    const { id: resultId, } = formToArticleBlock(
      {
        id,
        type: ArticleBlockType.CODE,
        code,
        name,
      },
      mockedArticleCodeBlock
    );

    expect(typeof resultId).toBe('string');
    expect(resultId).toBe(mockedArticleCodeBlock.id);
  });

  test('should return valid code block with initialValue Param', () => {
    const code = 'const s = 2';
    const name = 'name';
    const result = formToArticleBlock(
      {
        id: '123123',
        type: ArticleBlockType.CODE,
        code,
        name,
      },
      mockedArticleCodeBlock
    );

    expect(result).toEqual({
      id: mockedArticleCodeBlock.id,
      type: ArticleBlockType.CODE,
      code,
      name,
    });
  });

  test('should return valid code block without initialValue Param', () => {
    const code = 'const s = 2';
    const name = 'name';
    const id = '123123';
    const { id: resultId, ...result } = formToArticleBlock({
      id,
      type: ArticleBlockType.CODE,
      code,
      name,
    });

    expect(result).toEqual({
      type: ArticleBlockType.CODE,
      code,
      name,
    });
  });

  test('should return valid image block with initialValue Param', () => {
    const name = 'name';
    const title = 'title';
    const src = 'src';
    const result = formToArticleBlock(
      {
        id: '123123',
        type: ArticleBlockType.IMAGE,
        title,
        name,
        src,
      },
      mockedArticleImageBlock
    );

    expect(result).toEqual({
      id: mockedArticleImageBlock.id,
      type: ArticleBlockType.IMAGE,
      title,
      name,
      src,
    });
  });

  test('should return valid image block without initialValue Param', () => {
    const name = 'name';
    const title = 'title';
    const src = 'src';
    const { id: resultId, ...result } = formToArticleBlock({
      id: '123123',
      type: ArticleBlockType.IMAGE,
      title,
      name,
      src,
    });

    expect(result).toEqual({
      type: ArticleBlockType.IMAGE,
      title,
      name,
      src,
    });
  });

  test('should return valid text block with initialValue Param', () => {
    const name = 'name';
    const title = 'title';
    const paragraphs = [{ id: '1', text: 'text', },];
    const result = formToArticleBlock(
      {
        id: '123123',
        type: ArticleBlockType.TEXT,
        title,
        name,
        paragraphs,
      },
      mockedArticleTextBlock
    );

    expect(result).toEqual({
      id: mockedArticleTextBlock.id,
      type: ArticleBlockType.TEXT,
      title,
      name,
      paragraphs,
    });
  });

  test('should return valid text block without initialValue Param', () => {
    const name = 'name';
    const title = 'title';
    const paragraphs = [{ id: '1', text: 'text', },];
    const { id: resultId, ...result } = formToArticleBlock({
      id: '123123',
      type: ArticleBlockType.TEXT,
      title,
      name,
      paragraphs,
    });

    expect(result).toEqual({
      type: ArticleBlockType.TEXT,
      title,
      name,
      paragraphs,
    });
  });
});
