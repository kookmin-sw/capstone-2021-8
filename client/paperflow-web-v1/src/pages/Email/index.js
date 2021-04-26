import React, { useState } from 'react';
import { Button } from 'react-bootstrap';
import DefaultDesktopLayout from '../../layouts/Layouts/DefaultDesktop';

import stylesDesktopDefault from './DesktopDefault.module.scss';

const EmailInputPage = () => {
  const styles = stylesDesktopDefault;

  const [email, setEmail] = useState('');

  const handleSubmit = () => {
    if (/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,})+$/.test(email)) {
      console.log('submit : ', email);
    } else {
      // eslint-disable-next-line no-alert
      alert('Not validate email. Check your input.');
    }
  };

  return (
    <DefaultDesktopLayout>
      <div className={styles.container}>
        <div className={styles.emailContainer}>
          <div>
            <h2>
              PaperFlow에서는 매달 arXiv에 출판된 논문을
            </h2>
            <h2>
              분석, 통계 및 시각화하여 제공하고 있습니다.
            </h2>
            <br />
            <div>
              만약 지속적으로 소식을 받고 싶다면 이메일을 입력하세요.
            </div>
          </div>
          <div className={styles.emailInputContainer}>
            <input
              className={styles.emailInput}
              placeholder="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <Button onClick={handleSubmit}>
              Submit
            </Button>
          </div>
        </div>
      </div>
    </DefaultDesktopLayout>
  );
};

export default EmailInputPage;
