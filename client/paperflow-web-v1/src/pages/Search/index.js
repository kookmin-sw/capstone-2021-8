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
  const { screenClass, changeAlertModalContent } = useRootData(({ appStore }) => ({
    screenClass: appStore.screenClass.get(),

    changeAlertModalContent: appStore.changeAlertModalContent,
  }));
  const isDesktop = screenClass === 'xl';

  // eslint-disable-next-line no-unused-vars
  const styles = isDesktop ? stylesDesktopDefault : stylesDesktopDefault;

  const { search } = parseQueryString();
  const [searchKeyword, setSearchKeyword] = useState('');
  const [searchedPapers, setSearchedPapers] = useState([]);

  const searchHandler = async () => {
    try {
      const { data: { papers } } = await axios.get(`${config.backendEndPoint}/backend/search-paper`, {
        params: { searchKeyword },
      });
      setSearchedPapers(papers);
    } catch (err) {
      changeAlertModalContent(`뭔가 잘못되었습니다. ${err}`);
    }
  };

  useEffect(() => {
    (async () => {
      setSearchKeyword(search || '');

      await searchHandler();
    })();
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
              searchHandler();
            }
          }}
        />
        <Form.Text className="text-muted">
          논문 이름으로 검색할 수 있습니다.
        </Form.Text>
      </Form.Group>
      <hr />
      {
        searchedPapers.map(({
          title, date, authors, abstract, highlightKeywords, keywords,
        }) => (
          <PaperListItem
            key={title}
            title={title}
            date={date}
            authors={authors}
            abstract={abstract}
            highlightKeywords={highlightKeywords}
            keywords={keywords}
          />
        ))
      }

    </DefaultLayout>
  );
};

export default Search;
