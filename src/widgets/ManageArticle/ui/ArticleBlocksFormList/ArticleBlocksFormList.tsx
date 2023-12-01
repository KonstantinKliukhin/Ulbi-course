import cls from './ArticleBlocksFormList.module.scss';
import { classNames } from 'shared/lib';
import { type ComponentProps, memo } from 'react';
import {
  Button,
  ButtonTheme,
  CustomDndContext,
  SortableItem,
  Text
} from 'shared/ui';
import { rectSortingStrategy, SortableContext } from '@dnd-kit/sortable';
import { type ArticleBlock, ArticleBlockCard } from 'entities/Article';
import { useTranslation } from 'react-i18next';

interface ArticleBlocksFormListProps {
  className?: string
  dndContextProps: Omit<ComponentProps<typeof CustomDndContext>, 'children'>
  blocks: ArticleBlock[]
  onBlockEdit: (block: ArticleBlock, index: number) => void
  onBlockCopy: (block: ArticleBlock, index: number) => void
  onBlockDelete: (block: ArticleBlock, index: number) => void
  onBlockAdd: () => void
}

export const ArticleBlocksFormList = memo<ArticleBlocksFormListProps>(
  function ArticleBlocksFormList (props) {
    const { t: tGlobal, } = useTranslation();
    const { t, } = useTranslation('article');

    return (
      <div
        className={classNames(cls.ArticleBlocksFormList, {}, [props.className,])}
      >
        <div className={cls.header}>
          <Text title={t('article_blocks_list_title')} />
          <Button
            className={cls.addBlockButton}
            onClick={props.onBlockAdd}
            theme={ButtonTheme.OUTLINE}
          >
            {t('article_block_add_block')}
          </Button>
        </div>

        <CustomDndContext {...props.dndContextProps}>
          <SortableContext items={props.blocks} strategy={rectSortingStrategy}>
            <div className={cls.blocksList}>
              {props.blocks.map((block, index) => (
                <SortableItem id={block.id} key={block.id}>
                  <ArticleBlockCard block={block}>
                    <div className={cls.blockActions}>
                      <Button
                        theme={ButtonTheme.OUTLINE}
                        onClick={props.onBlockEdit.bind(null, block, index)}
                      >
                        {tGlobal('edit')}
                      </Button>
                      <Button
                        theme={ButtonTheme.BACKGROUND_INVERTED}
                        onClick={props.onBlockCopy.bind(null, block, index)}
                      >
                        {tGlobal('copy')}
                      </Button>
                      <Button
                        theme={ButtonTheme.OUTLINE_RED}
                        onClick={props.onBlockDelete.bind(null, block, index)}
                      >
                        {tGlobal('delete')}
                      </Button>
                    </div>
                  </ArticleBlockCard>
                </SortableItem>
              ))}
            </div>
          </SortableContext>
        </CustomDndContext>
      </div>
    );
  }
);
