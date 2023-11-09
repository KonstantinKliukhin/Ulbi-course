import { memo } from 'react';
import { Select } from 'shared/ui';
import { useTranslation } from 'react-i18next';
import { COUNTRY_OPTIONS } from '../../constants/options';
import { type Country } from '../../model/types/country';

interface CurrencySelectProps {
  className?: string
  value?: Country
  onChange?: (value: Country) => void
  readonly?: boolean
}

export const CountrySelect = memo<CurrencySelectProps>(function CountrySelect (props) {
  const { t, } = useTranslation();

  return (
    <Select
      value={props.value}
      readonly={props.readonly}
      className={props.className}
      onChange={props.onChange}
      options={COUNTRY_OPTIONS}
      label={t('country_label')}
    />
  );
});
