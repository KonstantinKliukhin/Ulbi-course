import { type ComponentProps, memo, Suspense, useCallback } from 'react';
import { Flyout, Loader } from 'shared/ui';
import { ManageArticleForm } from '../ManageArticleForm/ManageArticleForm.async';
import { type Article } from 'entities/Article';
import { type FormMode } from 'shared/types';
import { useAppDispatch } from 'shared/lib';
import { type ArticleFormType } from '../../model/types/articleForm';
import { updateArticle } from '../../model/services/updateArticle/updateArticle';
import { useArticleFormTitle } from './useArticleFormTitle';
import { createArticle } from '../../model/services/createArticle/createArticle';

interface ManageArticleModalProps extends ComponentProps<typeof Flyout> {
  article?: Article
  mode: FormMode
}

export const ManageArticleFlyout = memo<ManageArticleModalProps>(
  function ManageArticleFlyout (props) {
    const { article, onClose, ...flyoutProps } = props;
    const dispatch = useAppDispatch();

    const onSubmit = useCallback(
      async (articleForm: ArticleFormType) => {
        switch (props.mode) {
          case 'edit':
            await dispatch(updateArticle(articleForm));
            break;
          case 'create':
            await dispatch(createArticle(articleForm));
            break;
          default:
            break;
        }
        onClose();
      },
      [dispatch, onClose, props.mode,]
    );

    const formTitle = useArticleFormTitle(props.mode);

    return (
      <Flyout {...flyoutProps} onClose={onClose} lazy>
        <Suspense fallback={<Loader />}>
          <ManageArticleForm
            title={formTitle}
            onCancel={onClose}
            onSubmit={onSubmit}
            article={article}
          />
        </Suspense>
      </Flyout>
    );
  }
);
