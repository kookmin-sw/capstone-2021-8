import React from 'react';
import useRootData from '../../../hooks/useRootData';
import DefaultDesktopLayout from '../DefaultDesktop';
import DefaultMobileLayout from '../DefaultMobile';
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
        : (<DefaultMobileLayout className={className}>{children}</DefaultMobileLayout>)}
    </div>
  );
};

export default DefaultLayout;
