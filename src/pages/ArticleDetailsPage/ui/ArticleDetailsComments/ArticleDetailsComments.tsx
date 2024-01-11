import { memo, Suspense } from 'react';
import { Loader, Text, VStack } from '@/shared/ui';
import { AddArticleComment } from '@/features/AddArticleComment';
import { CommentsList } from '@/entities/Comment';
import { type RtkError } from '@/shared/types';
import { useGetArticleCommentsQuery } from '@/entities/Article';
import { useTranslation } from 'react-i18next';

interface ArticleDetailsCommentsProps {
  className?: string;
  articleId?: string;
}

export const ArticleDetailsComments = memo<ArticleDetailsCommentsProps>(
  function ArticleDetailsComments (props) {
    const { t, } = useTranslation('article');

    const articleCommentsData = useGetArticleCommentsQuery(
      { articleId: props.articleId ?? '', },
      { skip: !props.articleId, }
    );

    return (
      <VStack yGap={16} align="stretch">
        <VStack yGap={8} align="stretch">
          <Text title={t('comments')} />
          <Suspense fallback={<Loader centered />}>
            <AddArticleComment articleId={props.articleId} />
          </Suspense>
        </VStack>
        <CommentsList
          comments={articleCommentsData.data}
          isLoading={articleCommentsData.isLoading}
          error={(articleCommentsData.error as RtkError)?.message}
        />
      </VStack>
    );
  });
