import { type FC } from 'react'
import cls from './PageLoader.module.scss'
import { classNames } from 'shared/lib'
import { Loader } from 'shared/ui'

interface PageLoaderProps {
  className?: string
}

export const PageLoader: FC<PageLoaderProps> = props => {
  return (
    <div className={classNames(cls.PageLoader, {}, [props.className])}>
      <Loader/>
    </div>
  )
}
