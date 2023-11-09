import { memo } from 'react';
import { Select } from 'shared/ui';
import { useTranslation } from 'react-i18next';
import { CURRENCY_OPTIONS } from '../../constants/options';
import { type Currency } from 'entities/Currency';

interface CurrencySelectProps {
  className?: string
  value?: Currency
  onChange?: (value: Currency) => void
  readonly?: boolean
}

export const CurrencySelect = memo<CurrencySelectProps>(function CurrencySelect (props) {
  const { t, } = useTranslation();

  return (
    <Select
      value={props.value}
      readonly={props.readonly}
      className={props.className}
      onChange={props.onChange}
      options={CURRENCY_OPTIONS}
      label={t('currency_label')}
    />
  );
});
