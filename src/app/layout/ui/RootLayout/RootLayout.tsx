import { Navbar } from 'widgets/Navbar';
import { type FC, type PropsWithChildren, Suspense } from 'react';
import { Sidebar } from 'widgets/Sidebar/ui/Sidebar/Sidebar';
import { PageLoader } from 'widgets/PageLoader';

export const RootLayout: FC<PropsWithChildren> = props => (
  <Suspense fallback={<PageLoader/>}>
    <Navbar/>
    <div className="content-page">
      <Sidebar/>
      <div className="page">
        {props.children}
      </div>
    </div>
  </Suspense>
);
