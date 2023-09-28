import { Navbar } from 'widgets/Navbar'
import { Outlet } from 'react-router-dom'
import { type FC, Suspense } from 'react'
import { Sidebar } from 'widgets/Sidebar/ui/Sidebar/Sidebar'
import { PageLoader } from 'widgets/PageLoader'

export const RootLayout: FC = () => (
  <Suspense fallback={<PageLoader/>}>
    <Navbar/>
    <div className="content-page">
      <Sidebar/>
      <div className="page">
        <Outlet/>
      </div>
    </div>
  </Suspense>
)
