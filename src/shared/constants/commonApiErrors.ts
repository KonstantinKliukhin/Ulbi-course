import i18n from '../config/i18n/i18n';

export const COMMON_API_ERRORS = {
  get NO_DATA_PROVIDED_FROM_SERVER () {
    return i18n.t('no_data_provided_from_server');
  },
  get UNKNOWN_ERROR () {
    return i18n.t('unknown_error');
  },
};
