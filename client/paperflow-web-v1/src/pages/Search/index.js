import React, { useEffect, useState } from 'react';
import {
  Form,
} from 'react-bootstrap';
import axios from 'axios';
import useRootData from '../../hooks/useRootData';
import stylesDesktopDefault from './DesktopDefault.module.scss';
import DefaultLayout from '../../layouts/Layouts/Default';
import PaperListItem from '../../components/PaperListItem';
import {
  parseQueryString,
} from '../../utils/utility';
import config from '../../config';

const Search = () => {
  const { screenClass } = useRootData(({ appStore }) => ({
    screenClass: appStore.screenClass.get(),
  }));
  const isDesktop = screenClass === 'xl';

  // eslint-disable-next-line no-unused-vars
  const styles = isDesktop ? stylesDesktopDefault : stylesDesktopDefault;

  const { search } = parseQueryString();
  const [searchKeyword, setSearchKeyword] = useState('');

  useEffect(() => {
    (async function () {
      setSearchKeyword(search);

      try {
        await axios.get(`${config.backendEndPoint}/search-paper`, {
          params: { searchKeyword: search },
        });
      } catch {
        console.log('hi');
      }
    }());
  }, []);

  return (
    <DefaultLayout>
      <Form.Group controlId="formBasicEmail">
        <Form.Label>Search Papers</Form.Label>
        <Form.Control
          type="text"
          placeholder="논문 이름으로 검색"
          value={searchKeyword}
          onChange={(e) => setSearchKeyword(e.target.value)}
          onKeyPress={(e) => {
            if (e.key === 'Enter') {
              console.log('hi');
            }
          }}
        />
        <Form.Text className="text-muted">
          논문 이름으로 검색할 수 있습니다.
        </Form.Text>
      </Form.Group>
      <hr />
      <PaperListItem
        title="Scaling of Magnetic Dissipation and Particle Acceleration in ABC Fields"
        date="Nov 2021"
        authors={['Qiang Chen', 'Krzysztof Nalewajko', 'Bhupendra Mishra']}
        abstract="Automatic abstractive summaries are found to often distort or fabricate facts in the
          article. This inconsistency between summary and original text has seriously"
        highlightKeywords={['Math.AC']}
        keywords={['Math.RA']}
      />
    </DefaultLayout>
  );
};

export default Search;
