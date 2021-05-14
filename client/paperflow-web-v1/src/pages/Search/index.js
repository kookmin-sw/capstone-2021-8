import React, { useEffect, useState, useRef } from 'react';
import {
  Form,
  ButtonGroup,
  Button,
} from 'react-bootstrap';
import axios from 'axios';
import useRootData from '../../hooks/useRootData';
import stylesDesktopDefault from './DesktopDefault.module.scss';
import stylesMobileDefault from './MobileDefault.module.scss';
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

  const styles = isDesktop ? stylesDesktopDefault : stylesMobileDefault;

  const { search } = parseQueryString();
  const [searchKeyword, setSearchKeyword] = useState('');
  const [fromIndex, setFromIndex] = useState(0);
  const [searchedPapers, setSearchedPapers] = useState([]);

  const searchRef = useRef(null);

  const searchHandler = async () => {
    try {
      const { data: { papers } } = await axios.get(`${config.backendEndPoint}/backend/search-paper`, {
        params: { searchKeyword, from: fromIndex },
      });
      setSearchedPapers(papers);
    } catch (err) {
      changeAlertModalContent(`뭔가 잘못되었습니다. ${err}`);
    }
  };

  useEffect(() => {
    setSearchKeyword(search || '');
  }, []);

  useEffect(() => {
    searchHandler();
  }, [searchKeyword, fromIndex]);

  return (
    <DefaultLayout>
      <Form.Group controlId="formBasicEmail" ref={searchRef}>
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
          paper_id: paperId, title, publication_year: publicationYear,
          authors, abstract, field_list: fieldList,
        }) => (
          <PaperListItem
            key={paperId}
            paperId={paperId}
            title={title}
            date={publicationYear}
            authors={JSON.parse(authors).map((item) => item.name)}
            abstract={abstract}
            highlightKeywords={JSON.parse(fieldList).filter((item) => item === 'Computer Science')}
            keywords={JSON.parse(fieldList).filter((item) => item !== 'Computer Science')}
          />
        ))
      }

      <div className={styles.paginationButtons}>
        <ButtonGroup size="md" className="mb-2">
          <Button onClick={() => {
            setFromIndex(fromIndex - 10);
            searchRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
          }}
          >이전
          </Button>
          <Button>Middle</Button>
          <Button onClick={() => {
            setFromIndex(fromIndex + 10);
            searchRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
          }}
          >다음
          </Button>
        </ButtonGroup>
      </div>

    </DefaultLayout>
  );
};

export default Search;
