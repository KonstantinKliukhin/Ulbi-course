import { type ComponentProps, memo, Suspense, useCallback } from 'react';
import { Flyout, Loader } from 'shared/ui';
import { ManageArticleForm } from '../ManageArticleForm/ManageArticleForm.async';
import { type Article, useCreateArticleMutation, useUpdateArticleMutation } from 'entities/Article';
import { type FormMode } from 'shared/types';
import { useAppSelector } from 'shared/lib';
import { type ArticleFormType } from '../../model/types/articleForm';
import { useArticleFormTitle } from './useArticleFormTitle';
import { articleFormToDTO } from '../../lib/articleFormToDTO/articleFormToDTO';
import { getUserAuthData } from 'entities/User';

interface ManageArticleModalProps extends ComponentProps<typeof Flyout> {
  article?: Article;
  mode: FormMode;
}

export const ManageArticleFlyout = memo<ManageArticleModalProps>(
  function ManageArticleFlyout (props) {
    const { article, onClose, ...flyoutProps } = props;
    const [updateArticle,] = useUpdateArticleMutation();
    const [createArticle,] = useCreateArticleMutation();
    const user = useAppSelector(getUserAuthData);

    const onSubmit = useCallback(
      async (articleForm: ArticleFormType) => {
        if (!user?.id) return;
        const newArticle = articleFormToDTO({
          initialArticle: props.article,
          form: articleForm,
          userId: user?.id,
        });
        switch (props.mode) {
          case 'edit':
            if (props.article) {
              await updateArticle({ article: newArticle, oldArticle: props.article, });
            }
            break;
          case 'create':
            await createArticle({ article: newArticle, });
            break;
          default:
            break;
        }
        onClose();
      },
      [createArticle, onClose, props.article, props.mode, updateArticle, user?.id,]
    );

    const formTitle = useArticleFormTitle(props.mode);

    return (
      <Flyout {...flyoutProps} onClose={onClose} lazy>
        <Suspense fallback={<Loader />}>
          {flyoutProps.open
            ? (
              <ManageArticleForm
                title={formTitle}
                onCancel={onClose}
                onSubmit={onSubmit}
                article={article}
              />
              )
            : null
          }
        </Suspense>
      </Flyout>
    );
  }
);
