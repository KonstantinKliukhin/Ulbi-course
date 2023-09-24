import React, { type FC } from 'react'
import { useTranslation } from 'react-i18next'

export const AboutPage: FC = () => {
  const { t } = useTranslation('about')
  return (
    <div>
      {t('about_site')}
    </div>
  )
}

export default AboutPage
