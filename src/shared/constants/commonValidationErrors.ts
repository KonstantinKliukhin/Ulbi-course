import i18n from '../config/i18n/i18n';

export const COMMON_VALIDATION_ERRORS = {
  get FIELD_IS_REQUIRED () {
    return i18n.t('error_field_required');
  },
  get INVALID_COUNTRY () {
    return i18n.t('error_field_country');
  },
  get INVALID_CURRENCY () {
    return i18n.t('error_field_currency');
  },
  get INVALID_URL () {
    return i18n.t('error_field_url');
  },
  get INVALID_AGE_RANGE () {
    return i18n.t('error_field_age');
  },
};
