import { lazy } from 'react'

export const AsyncMainPage = lazy(async () => await new Promise((resolve) => {
  setTimeout(() => {
    // @ts-expect-error
    resolve(import('./MainPage'))
  }, 1500)
}))
