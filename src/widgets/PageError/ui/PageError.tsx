import { type FC } from 'react'
import cls from './PageError.module.scss'
import { classNames } from 'shared/lib'
import { Button } from 'shared/ui'
import { useTranslation } from 'react-i18next'
import { ThemeButton } from 'shared/ui/Button/Button'

interface PageErrorProps {
  className?: string
}

export const PageError: FC<PageErrorProps> = props => {
  const { t } = useTranslation()

  const reloadPage = (): void => {
    location.reload()
  }

  return (
    <div className={classNames(cls.PageError, {}, [props.className])}>
      <p>{t('page_error')}</p>
      <Button onClick={reloadPage} theme={ThemeButton.NATIVE}>
        {t('reload_page')}
      </Button>
    </div>
  )
}
