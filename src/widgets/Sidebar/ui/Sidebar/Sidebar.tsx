import { type FC, useState } from 'react'
import cls from './Sidebar.module.scss'
import { classNames } from 'shared/lib'
import { ThemeSwitcher } from 'features/ThemeSwitcher'
import { LanguageSwitcher } from 'features/LanguageSwitcher'
import { Button } from 'shared/ui'

interface SidebarProps {
  className?: string
}

export const Sidebar: FC<SidebarProps> = props => {
  const [collapsed, setCollapsed] = useState(false)
  const onToggle = (): void => {
    setCollapsed(prev => !prev)
  }

  return (
    <div
      data-testid="sidebar"
      className={classNames(
        cls.Sidebar,
        { [cls.collapsed]: collapsed },
        [props.className]
      )}
        >
      <Button
        data-testid="sidebar-toggle"
        onClick={onToggle}
            >
        toggle
      </Button>

      <div className={cls.switchers}>
        <LanguageSwitcher/>
        <ThemeSwitcher className={cls.themeSwitcher}/>
      </div>
    </div>
  )
}
