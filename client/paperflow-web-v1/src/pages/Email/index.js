import React from 'react';
import { Button } from 'react-bootstrap';
import DefaultDesktopLayout from '../../layouts/Layouts/DefaultDesktop';

import stylesDesktopDefault from './DesktopDefault.module.scss';

const Email = () => {
  const styles = stylesDesktopDefault;

  return (
    <DefaultDesktopLayout>
      <div className={styles.emailContainer}>
        <div>
          만약 지속적으로 연락을 받고 싶다면 이메일을 입력하세요.
        </div>
        <div className={styles.emailInputContainer}>
          <input className={styles.emailInput} />
          <Button>
            Submit
          </Button>
        </div>
      </div>
    </DefaultDesktopLayout>
  );
};

export default Email;
