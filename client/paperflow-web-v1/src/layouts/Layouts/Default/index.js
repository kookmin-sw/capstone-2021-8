import React from 'react';

import DefaultDesktopLayout from '../DefaultDesktop';

const App = ({ children, className, screenClass }) => {
  const isDesktop = screenClass === 'xl';

  return (
    <div>
      {isDesktop ? (<DefaultDesktopLayout className={className}>{children}</DefaultDesktopLayout>)
        : (<DefaultDesktopLayout className={className}>{children}</DefaultDesktopLayout>)}
    </div>
  );
};

export default App;
