import { memo, Suspense } from 'react';
import { ArticleCodeBlockForm } from '../ArticleCodeBlockForm/ArticleCodeBlockForm.async';
import { ArticleImageBlockForm } from '../ArticleImageBlockForm/ArticleImageBlockForm.async';
import { ArticleTextBlockForm } from '../ArticleTextBlockForm/ArticleTextBlockForm.async';
import { Loader } from '@/shared/ui';
import { type Control } from 'react-hook-form';
import { ArticleBlockType } from '@/entities/Article';
import { type ArticleBlockFormType } from '../../../model/types/articleBlockForm';

interface ArticleBlockFormProps {
  blockType?: ArticleBlockType;
  control: Control<ArticleBlockFormType>;
}

export const ArticleBlockFormPicker = memo<ArticleBlockFormProps>(function ArticleBlockFormPicker (props) {
  if (!props.blockType) return null;

  switch (props.blockType) {
    case ArticleBlockType.CODE:
      return (
        <Suspense fallback={<Loader/>}>
          <ArticleCodeBlockForm />
        </Suspense>
      );
    case ArticleBlockType.IMAGE:
      return (
        <Suspense fallback={<Loader/>}>
          <ArticleImageBlockForm/>
        </Suspense>
      );
    case ArticleBlockType.TEXT:
      return (
        <Suspense fallback={<Loader/>}>
          <ArticleTextBlockForm control={props.control}/>
        </Suspense>
      );
  }
});
