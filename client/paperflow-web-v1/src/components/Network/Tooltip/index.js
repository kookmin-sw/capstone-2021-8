import React from 'react';

import stylesDesktopDefault from './DesktopDefault.module.scss';

const NetworkTooltip = ({ tooltipRef }) => {
  const styles = stylesDesktopDefault;

  return (
    <div
      className={styles.tooltip}
      ref={tooltipRef}
    >
      <div
        className={styles.tooltipID}
      />
    </div>
  );
};
export default NetworkTooltip;
