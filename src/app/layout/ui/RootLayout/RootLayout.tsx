import { Navbar } from '@/widgets/Navbar';
import { type FC, type PropsWithChildren, Suspense } from 'react';
import { Sidebar } from '@/widgets/Sidebar';
import { PageLoader } from '@/widgets/PageLoader';

export const RootLayout: FC<PropsWithChildren> = props => (
  <Suspense fallback={<PageLoader/>}>
    <div className="layout">
      <Sidebar/>
      <div className="content-page">
        <Navbar/>
        {props.children}
      </div>
    </div>
  </Suspense>
);
