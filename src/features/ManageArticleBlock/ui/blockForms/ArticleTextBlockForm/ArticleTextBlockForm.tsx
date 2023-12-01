import { memo, useCallback } from 'react';
import cls from './ArticleTextBlockForm.module.scss';
import { classNames, useDragEnd } from 'shared/lib';
import {
  Button,
  ButtonTheme,
  CustomDndContext,
  FormInput,
  FormTextArea,
  SortableItem,
  Text,
  TextTheme
} from 'shared/ui';
import { useTranslation } from 'react-i18next';
import { type Control, useFieldArray } from 'react-hook-form';
import { type ArticleBlock } from 'entities/Article';
import { v4 as uuidV4 } from 'uuid';
import { rectSortingStrategy, SortableContext } from '@dnd-kit/sortable';
import { type PointerSensorOptions } from '@dnd-kit/core';
import { NOT_DRAGGRABLE_PROPS } from 'shared/constants';

interface ArticleTextBlockFormProps {
  className?: string
  control: Control<ArticleBlock>
}

const getNewParagraph = () => ({
  id: uuidV4(),
  text: '',
});

const pointerSensorOptions: PointerSensorOptions = {
  activationConstraint: { delay: 300, tolerance: 100, },
};

const ArticleTextBlockForm = memo<ArticleTextBlockFormProps>(
  function ArticleTextBlockForm (props) {
    const { t: tGlobal, } = useTranslation();
    const { t, } = useTranslation('article');

    const {
      fields: paragraphs,
      move: moveParagraph,
      remove: removeParagraph,
      append: appendParagraph,
    } = useFieldArray({
      control: props.control,
      name: 'paragraphs',
    });

    const onParagraphDragEnd = useDragEnd(
      paragraphs,
      useCallback(
        ({ oldIndex, newIndex, }) => {
          moveParagraph(oldIndex, newIndex);
        },
        [moveParagraph,]
      )
    );

    const createParagraph = useCallback(() => {
      appendParagraph(getNewParagraph());
    }, [appendParagraph,]);

    return (
      <div
        className={classNames(cls.ArticleCodeBlockForm, {}, [props.className,])}
      >
        <FormInput
          label={t('article_block_title_field_label')}
          name={'title'}
        />

        <div className={cls.paragraphActions}>
          <Button theme={ButtonTheme.OUTLINE} onClick={createParagraph}>
            {t('article_block_paragraphs_add_paragraph')}
          </Button>
        </div>
        <CustomDndContext
          onDragEnd={onParagraphDragEnd}
          pointerSensorOptions={pointerSensorOptions}
        >
          <SortableContext items={paragraphs} strategy={rectSortingStrategy}>
            {paragraphs.map((paragraph, index) => (
              <SortableItem id={paragraph.id} key={paragraph.id}>
                <FormTextArea
                  resize="vertical"
                  {...NOT_DRAGGRABLE_PROPS}
                  label={
                    <div className={cls.label}>
                      {t('article_block_text_field_label')}
                      <Text
                        onClick={removeParagraph.bind(null, index)}
                        className={cls.removeButton}
                        theme={TextTheme.ERROR}
                        text={tGlobal('delete')}
                      />
                    </div>
                  }
                  name={`paragraphs.${index}.text`}
                />
              </SortableItem>
            ))}
          </SortableContext>
        </CustomDndContext>
      </div>
    );
  }
);

export default ArticleTextBlockForm;
