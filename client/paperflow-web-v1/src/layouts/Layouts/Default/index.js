import React from 'react';
import useRootData from '../../../hooks/useRootData';
import DefaultDesktopLayout from '../DefaultDesktop';
import AlertModal from '../../../components/AlertModal';

const DefaultLayout = ({ children, className }) => {
  const { screenClass } = useRootData(({ appStore }) => ({
    screenClass: appStore.screenClass.get(),
  }));
  const isDesktop = screenClass === 'xl';

  return (
    <div>
      <AlertModal />
      {isDesktop ? (<DefaultDesktopLayout className={className}>{children}</DefaultDesktopLayout>)
        : (<DefaultDesktopLayout className={className}>{children}</DefaultDesktopLayout>)}
    </div>
  );
};

export default DefaultLayout;
