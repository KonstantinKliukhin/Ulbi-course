import { type FC } from 'react';
import { type Comment } from '../../model/types/comment';
import { AsyncContainer, Text, VStack } from '@/shared/ui';
import { useTranslation } from 'react-i18next';
import { CommentCard } from '../CommentCard/CommentCard';
import { CommentsListSkeleton } from './CommentsListSkeleton';

interface CommentListProps {
  className?: string;
  comments?: Comment[];
  isLoading?: boolean;
  error?: null | string;
}

export const CommentsList: FC<CommentListProps> = (props) => {
  const { t, } = useTranslation('comment');

  return (
    <VStack align="stretch" yGap={16} className={props.className}>
      <AsyncContainer error={props.error} isLoading={props.isLoading} loadingNode={<CommentsListSkeleton/>}>
        {props.comments?.map((comment) => (
          <CommentCard comment={comment} key={comment.id} />
        ))}
        {!props.comments?.length ? <Text title={t('no_comments')} /> : null}
      </AsyncContainer>
    </VStack>
  );
};
