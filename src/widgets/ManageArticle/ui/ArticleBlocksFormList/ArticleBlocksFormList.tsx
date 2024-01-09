import cls from './ArticleBlocksFormList.module.scss';
import {
  type AsyncLibrariesNames,
  classNames,
  withLibraries,
  type WithLibrariesProps
} from '@/shared/lib';
import { type ComponentProps, memo } from 'react';
import {
  Button,
  CustomDndContext,
  HStack,
  SortableItem,
  Text,
  VStack
} from '@/shared/ui';
import { type ArticleBlock, ArticleBlockCard } from '@/entities/Article';
import { useTranslation } from 'react-i18next';

interface ArticleBlocksFormListProps extends WithLibrariesProps<typeof usedLibraries> {
  className?: string;
  dndContextProps: Omit<ComponentProps<typeof CustomDndContext>, 'children'>;
  blocks: ArticleBlock[];
  onBlockEdit: (block: ArticleBlock, index: number) => void;
  onBlockCopy: (block: ArticleBlock, index: number) => void;
  onBlockDelete: (block: ArticleBlock, index: number) => void;
  onBlockAdd: () => void;
}

const usedLibraries: AsyncLibrariesNames[] = ['dndKitSortable',];

const ArticleBlocksFormList = memo<ArticleBlocksFormListProps>(
  function ArticleBlocksFormList (props) {
    const { dndKitSortable, } = props;
    const { t: tGlobal, } = useTranslation();
    const { t, } = useTranslation('article');

    return (
      <div
        className={classNames(cls.ArticleBlocksFormList, {}, [props.className,])}
      >
        <HStack justify="between" align="center" className={cls.header}>
          <Text title={t('article_blocks_list_title')} />
          <Button
            className={cls.addBlockButton}
            onClick={props.onBlockAdd}
            theme="outline"
          >
            {t('article_block_add_block')}
          </Button>
        </HStack>

        <CustomDndContext {...props.dndContextProps}>
          <dndKitSortable.SortableContext items={props.blocks} strategy={dndKitSortable.rectSortingStrategy}>
            <VStack align="start" yGap={8}>
              {props.blocks.map((block, index) => (
                <SortableItem
                  defaultClass={cls.block}
                  id={block.id}
                  key={block.id}
                >
                  <ArticleBlockCard block={block}>
                    <HStack
                      align="center"
                      xGap={8}
                      className={cls.blockActions}
                    >
                      <Button
                        theme="outline"
                        onClick={props.onBlockEdit.bind(null, block, index)}
                      >
                        {tGlobal('edit')}
                      </Button>
                      <Button
                        theme="backgroundInverted"
                        onClick={props.onBlockCopy.bind(null, block, index)}
                      >
                        {tGlobal('copy')}
                      </Button>
                      <Button
                        theme="outlineRed"
                        onClick={props.onBlockDelete.bind(null, block, index)}
                      >
                        {tGlobal('delete')}
                      </Button>
                    </HStack>
                  </ArticleBlockCard>
                </SortableItem>
              ))}
            </VStack>
          </dndKitSortable.SortableContext>
        </CustomDndContext>
      </div>
    );
  }
);

const WithLibrariesArticleBlocksFormList = withLibraries({
  libraries: usedLibraries,
})(ArticleBlocksFormList);

export { WithLibrariesArticleBlocksFormList as ArticleBlocksFormList };
