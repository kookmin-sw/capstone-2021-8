import React from 'react';
import {
  Form,
} from 'react-bootstrap';
import useRootData from '../../hooks/useRootData';
import stylesDesktopDefault from './DesktopDefault.module.scss';
import DefaultLayout from '../../layouts/Layouts/Default';
import PaperListItem from '../../components/PaperListItem';

const Search = () => {
  const { screenClass } = useRootData(({ appStore }) => ({
    screenClass: appStore.screenClass.get(),
  }));
  const isDesktop = screenClass === 'xl';

  // eslint-disable-next-line no-unused-vars
  const styles = isDesktop ? stylesDesktopDefault : stylesDesktopDefault;

  return (
    <DefaultLayout>
      <Form>
        <Form.Group controlId="formBasicEmail">
          <Form.Label>Search Papers</Form.Label>
          <Form.Control type="text" placeholder="논문 이름으로 검색" />
          <Form.Text className="text-muted">
            논문 이름으로 검색할 수 있습니다.
          </Form.Text>
        </Form.Group>
      </Form>
      <hr />
      <PaperListItem
        title="Scaling of Magnetic Dissipation and Particle Acceleration in ABC Fields"
        date="Nov 2021"
        author="Qiang Chen, Krzysztof Nalewajko, Bhupendra Mishra"
        abstract="Automatic abstractive summaries are found to often distort or fabricate facts in the
          article. This inconsistency between summary and original text has seriously…"
      />
    </DefaultLayout>
  );
};

export default Search;
