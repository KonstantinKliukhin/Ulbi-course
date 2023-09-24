import { lazy } from 'react'

export const AsyncMainPage = lazy(async () => await new Promise((resolve) => {
  // @ts-expect-error fuck eslint
  setTimeout(() => {
    resolve(import('./MainPage'))
  }, 1500)
}))
