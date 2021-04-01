import React from 'react';

import DefaultDesktopLayout from '../DefaultDesktop';

const DefaultLayout = ({ children, className, screenClass }) => {
  const isDesktop = screenClass === 'xl';

  return (
    <div>
      {isDesktop ? (<DefaultDesktopLayout className={className}>{children}</DefaultDesktopLayout>)
        : (<DefaultDesktopLayout className={className}>{children}</DefaultDesktopLayout>)}
    </div>
  );
};

export default DefaultLayout;
