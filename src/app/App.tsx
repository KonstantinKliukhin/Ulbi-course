import { RouterProvider } from 'react-router-dom'
import './styles/index.scss'
import { useTheme } from 'app/providers/ThemeProvider'
import { classNames } from 'shared/lib'
import { AppRouter } from 'app/providers/router'
import 'shared/config/i18n/i18n'
import { type FC } from 'react'

export const App: FC = () => {
  const { theme } = useTheme()

  return (
    <div className={classNames('app', {}, [theme])}>
      <RouterProvider router={AppRouter}/>
    </div>
  )
}
