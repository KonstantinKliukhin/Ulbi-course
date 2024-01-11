import cls from './RatingCard.module.scss';
import { classNames, useBoolState } from '@/shared/lib';
import { type ChangeEvent, memo, useCallback, useState } from 'react';
import {
  AsyncContainer,
  Button,
  Card,
  HStack,
  MobileDrawer,
  Modal,
  StarsRating,
  Text,
  TextArea,
  VStack
} from '@/shared/ui';
import { useTranslation } from 'react-i18next';
import { BrowserView, MobileView } from 'react-device-detect';
import { RatingCardSkeleton } from './RatingCardSkeleton';

interface RatingCardProps {
  className?: string;
  title?: string;
  feedbackTitle?: string;
  hasFeedback?: boolean;
  rate?: number;
  onCancel?: (starsCount: number) => void;
  onAccept?: (starsCount: number, feedback?: string) => void;
  isRatingLoading?: boolean;
}

const RatingCardContent = memo<RatingCardProps>(function RatingCard (props) {
  const { onAccept, onCancel, } = props;
  const { boolState: isModalOpen, enable: openModal, disable: closeModal, } = useBoolState(false);
  const [starsCount, setStarsCount,] = useState(props.rate ?? 0);
  const [feedback, setFeedback,] = useState('');
  const { t: ratingT, } = useTranslation('rating');
  const { t, } = useTranslation();

  const onSelectStars = useCallback((stars: number) => {
    setStarsCount(stars);
    if (props.hasFeedback) {
      openModal();
    }
  }, [openModal, props.hasFeedback,]);

  const onChangeFeedback = useCallback((e: ChangeEvent<HTMLTextAreaElement>) => {
    setFeedback(e.target.value);
  }, []);

  const handleAccept = useCallback(() => {
    onAccept?.(starsCount, feedback);
    closeModal();
  }, [feedback, onAccept, starsCount, closeModal,]);

  const handleCancel = useCallback(() => {
    onCancel?.(starsCount);
    closeModal();
  }, [closeModal, onCancel, starsCount,]);

  const feedbackContent = (
    <VStack fullWidth yGap={32} align="stretch">
      <Text align="center" title={props.feedbackTitle}/>
      <TextArea
        label={ratingT('leave_feedback')}
        textAreaClassName={cls.textarea}
        onChange={onChangeFeedback}
        resize="vertical"
        placeholder={ratingT('leave_feedback')}
      />
    </VStack>
  );

  return (
    <Card className={classNames(cls.RatingCard, {}, [props.className,])}>
      <VStack align="center" yGap={8}>
        <Text title={starsCount ? ratingT('thanks_for_feedback') : props.title} />
        <StarsRating selectedStars={starsCount} size={40} onSelect={onSelectStars} />
      </VStack>
      <BrowserView>
        <Modal contentClassName={cls.modal} open={isModalOpen} onClose={handleCancel}>
          <VStack yGap={16} align="stretch">
            {feedbackContent}
            <HStack justify="end" xGap={16}>
              <Button theme="outlineRed" onClick={handleCancel}>
                {t('cancel')}
              </Button>
              <Button theme="outline" onClick={handleAccept}>
                {t('send')}
              </Button>
            </HStack>
          </VStack>
        </Modal>
      </BrowserView>
      <MobileView>
        <MobileDrawer open={isModalOpen} onClose={handleCancel} lazy>
          <VStack yGap={32} align="stretch">
            {feedbackContent}
            <HStack xGap={8}>
              <Button fullWidth theme="outlineRed" onClick={handleCancel}>
                {t('cancel')}
              </Button>
              <Button fullWidth theme="outline" onClick={handleAccept}>
                {t('send')}
              </Button>
            </HStack>
          </VStack>
        </MobileDrawer>
      </MobileView>
    </Card>
  );
});

export const RatingCard = memo<RatingCardProps>(function RatingCard (props) {
  return (
    <AsyncContainer isLoading={props.isRatingLoading} loadingNode={<RatingCardSkeleton/>}>
      <RatingCardContent {...props}/>
    </AsyncContainer>
  );
});
