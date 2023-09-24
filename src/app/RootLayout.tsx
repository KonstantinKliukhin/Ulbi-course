import { Navbar } from 'widgets/Navbar'
import { Outlet } from 'react-router-dom'
import { type FC, Suspense } from 'react'
import { Sidebar } from 'widgets/Sidebar/ui/Sidebar/Sidebar'

export const RootLayout: FC = () => (
  <Suspense fallback={<div>Loading...</div>}>
    <Navbar/>
    <div className="content-page">
      <Sidebar/>
      <div className="page">
        <Outlet/>
      </div>
    </div>
  </Suspense>
)
