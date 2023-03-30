import React, { useState } from 'react';
import axios from 'axios';
import { Button } from 'react-bootstrap';
import config from '../../config';
import AlertModal from '../../components/AlertModal';
import useRootData from '../../hooks/useRootData';
import DefaultDesktopLayout from '../../layouts/Layouts/DefaultDesktop';

import stylesDesktopDefault from './DesktopDefault.module.scss';
import stylesMobileDefault from './MobileDefault.module.scss';

const EmailInputPage = () => {
  const {
    screenClass, changeAlertModalContent,
  } = useRootData(({ appStore }) => ({
    screenClass: appStore.screenClass.get(),

    changeAlertModalContent: appStore.changeAlertModalContent,
  }));
  const isDesktop = screenClass === 'xl';

  const styles = isDesktop ? stylesDesktopDefault : stylesMobileDefault;

  const [email, setEmail] = useState('');

  const handleSubmit = () => {
    if (/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,})+$/.test(email)) {
      axios.post(`${config.backendEndPoint}/newsletter/email/`, {
        email,
      })
        .then(() => {
          changeAlertModalContent('성공적으로 구독했습니다.');
          setEmail('');
        })
        .catch(() => {
          changeAlertModalContent('무언가 잘못됬습니다. 다시 시도해주세요.');
        });
    } else {
      changeAlertModalContent('유효하지 않은 이메일 주소입니다.');
    }
  };

  return (
    <DefaultDesktopLayout>
      <AlertModal />
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
            <div className={styles.desciption}>
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
