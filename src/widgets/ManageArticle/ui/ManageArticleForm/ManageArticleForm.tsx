import { memo, Suspense, useCallback, useMemo } from 'react';
import { type Article, type ArticleBlock } from 'entities/Article';
import { FormProvider, useFieldArray } from 'react-hook-form';
import {
  findIndexById,
  useAction,
  useAppSelector,
  useDragEnd,
  withLazySlices
} from 'shared/lib';
import { useArticleForm } from '../../model/hooks/useArticleForm/useArticleForm';
import {
  getBlockFormMode,
  getCurrentBlockIndex,
  getEditingArticleBlock
} from '../../model/selectors/getManageArticleState/getManageArticleState';
import {
  manageArticleActions,
  manageArticleReducer
} from '../../model/slices/manageArticleSlice';
import { Flyout, Loader } from 'shared/ui';
import { ManageArticleBlockForm } from 'features/ManageArticleBlock';
import { type ArticleFormType } from '../../model/types/articleForm';
import { ArticleForm } from '../ArticleForm/ArticleForm.async';
import { useArticleBlockFormTitle } from './useArticleBlockFormTitle';
import { ArticleBlocksFormList } from '../ArticleBlocksFormList/ArticleBlocksFormList';

interface ManageArticleFormProps {
  className?: string
  article?: Article
  onSubmit: (article: ArticleFormType) => void
  onCancel: () => void
  title: string
}

const ManageArticleForm = memo<ManageArticleFormProps>(
  function ManageArticleForm (props) {
    const { onCancel, } = props;
    const currentBlockIndex = useAppSelector(getCurrentBlockIndex);
    const blockFormMode = useAppSelector(getBlockFormMode);
    const editingBlock = useAppSelector(getEditingArticleBlock);

    const articleForm = useArticleForm(props.article);
    const isSubmitDisabled =
      !articleForm.formState.isValid || !articleForm.formState.isDirty;
    const { reset: resetArticleForm, } = articleForm;
    const {
      fields: articleBlocks,
      move: moveArticleBlock,
      append: appendArticleBlock,
      update: updateArticleBlock,
      remove: removeArticleBlock,
    } = useFieldArray({
      control: articleForm.control,
      name: 'blocks',
    });

    const resetArticleBlockFormData = useAction(
      manageArticleActions.resetArticleBlockFormData
    );

    const onEditBlock = useAction(
      manageArticleActions.editArticleBlock,
      useCallback(
        (articleBlock: ArticleBlock) => ({
          newIndex: findIndexById(articleBlocks, articleBlock.id),
          editingArticleBlock: articleBlock,
        }),
        [articleBlocks,]
      )
    );

    const onAddBlock = useAction(
      manageArticleActions.addArticleBlock,
      useCallback(() => articleBlocks.length, [articleBlocks.length,])
    );

    const onCopyBlock = useAction(
      manageArticleActions.copyArticleBlock,
      useCallback(
        (articleBlock: ArticleBlock) => ({
          newIndex: articleBlocks.length,
          copyingArticleBlock: articleBlock,
        }),
        [articleBlocks.length,]
      )
    );

    const onDeleteBlock = useCallback(
      (_: ArticleBlock, index: number) => {
        removeArticleBlock(index);
      },
      [removeArticleBlock,]
    );

    const onBlockFormSubmit = useCallback(
      (articleBlock: ArticleBlock) => {
        switch (blockFormMode) {
          case 'create':
            appendArticleBlock(articleBlock);
            break;
          case 'edit':
            updateArticleBlock(currentBlockIndex, articleBlock);
            break;
          case 'copy':
            appendArticleBlock(articleBlock);
            break;
          default:
            break;
        }
        resetArticleBlockFormData();
      },
      [
        appendArticleBlock,
        blockFormMode,
        currentBlockIndex,
        resetArticleBlockFormData,
        updateArticleBlock,
      ]
    );

    const onDragEnd = useDragEnd(
      articleBlocks,
      useCallback(
        ({ oldIndex, newIndex, }) => {
          moveArticleBlock(oldIndex, newIndex);
        },
        [moveArticleBlock,]
      )
    );

    const dndContextProps = useMemo(
      () => ({
        onDragEnd,
      }),
      [onDragEnd,]
    );

    const onArticleFormCancel = useCallback(() => {
      onCancel();
      resetArticleForm({});
    }, [onCancel, resetArticleForm,]);

    const blockFormTitle = useArticleBlockFormTitle(blockFormMode);

    return (
      <>
        <FormProvider {...articleForm}>
          <form onSubmit={articleForm.handleSubmit(props.onSubmit)}>
            <Suspense fallback={<Loader />}>
              <ArticleForm
                isSubmitDisabled={isSubmitDisabled}
                onCancel={onArticleFormCancel}
                title={props.title}
                blocksChildren={
                  <ArticleBlocksFormList
                    dndContextProps={dndContextProps}
                    onBlockAdd={onAddBlock}
                    onBlockEdit={onEditBlock}
                    onBlockCopy={onCopyBlock}
                    onBlockDelete={onDeleteBlock}
                    blocks={articleBlocks}
                  />
                }
              />
            </Suspense>
          </form>
        </FormProvider>
        <Flyout
          open={currentBlockIndex !== -1}
          onClose={resetArticleBlockFormData}
          lazy
        >
          <Suspense fallback={<Loader />}>
            <ManageArticleBlockForm
              articleBlock={editingBlock || undefined}
              title={blockFormTitle}
              onSubmit={onBlockFormSubmit}
              onCancel={resetArticleBlockFormData}
            />
          </Suspense>
        </Flyout>
      </>
    );
  }
);

export default withLazySlices({
  onlyIfSliceReady: true,
  removeOnUnmount: true,
  reducers: { manageArticle: manageArticleReducer, },
})(ManageArticleForm);
