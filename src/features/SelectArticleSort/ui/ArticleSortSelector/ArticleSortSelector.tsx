import { type ChangeEvent, memo, useCallback, useMemo } from 'react';
import { HStack, Select } from '@/shared/ui';
import { useTranslation } from 'react-i18next';
import { type SortOrder } from '@/shared/types';
import { ArticleSortField } from '@/entities/Article';

interface ArticleSortSelectorProps {
  className?: string;
  onChangeOrder: (order: SortOrder) => void;
  onChangeSort: (sort: ArticleSortField) => void;
  order: SortOrder;
  sort: ArticleSortField;
}

export const ArticleSortSelector = memo<ArticleSortSelectorProps>(
  function ArticleSortSelector (props) {
    const { onChangeSort, onChangeOrder, } = props;
    const { t, } = useTranslation();

    const orderOptions = useMemo<Array<{ value: SortOrder; content: string }>>(
      () => [
        {
          value: 'asc',
          content: t('asc'),
        },
        {
          value: 'desc',
          content: t('desc'),
        },
      ],
      [t,]
    );

    const sortOptions = useMemo<
    Array<{ value: ArticleSortField; content: string }>
    >(
      () => [
        {
          value: ArticleSortField.CREATED,
          content: t('sort_created'),
        },
        {
          value: ArticleSortField.TITLE,
          content: t('sort_title'),
        },
        {
          value: ArticleSortField.VIEWS,
          content: t('sort_views'),
        },
      ],
      [t,]
    );

    const onSelectOrder = useCallback(
      (e: ChangeEvent<HTMLSelectElement>) => {
        onChangeOrder?.(e.target.value as SortOrder);
      },
      [onChangeOrder,]
    );

    const onSelectSort = useCallback(
      (e: ChangeEvent<HTMLSelectElement>) => {
        onChangeSort?.(e.target.value as ArticleSortField);
      },
      [onChangeSort,]
    );

    return (
      <HStack align="center" xGap={8} className={props.className}>
        <Select
          onChange={onSelectSort}
          options={sortOptions}
          label={t('sort_by')}
          value={props.sort}
        />
        <Select
          onChange={onSelectOrder}
          options={orderOptions}
          label={t('sort_direction')}
          value={props.order}
        />
      </HStack>
    );
  }
);
