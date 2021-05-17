import React, { useEffect, useState } from 'react';
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

  const paginationSize = 10;
  const paginationRadius = isDesktop ? 5 : 2;

  const { search } = parseQueryString();
  const [searchKeyword, setSearchKeyword] = useState('');
  const [fromIndex, setFromIndex] = useState(0);
  const [searchedPapers, setSearchedPapers] = useState([]);
  const [totalPapers, setTotalPapers] = useState(0);
  const [searchTook, setSearchTook] = useState(0);

  const pagination = (pageNum) => {
    setFromIndex((pageNum - 1) * paginationSize);
    window.scrollTo(0, 0);
  };

  const searchHandler = async () => {
    try {
      const { data: { papers, total, took } } = await axios.get(`${config.backendEndPoint}/backend/search-paper`, {
        params: { searchKeyword, from: fromIndex, size: paginationSize },
      });
      setSearchedPapers(papers);
      setTotalPapers(total);
      setSearchTook(took);
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
      <div className={styles.searchResultSummary}>검색 결과: {totalPapers.toLocaleString()}개
        ({searchTook / 1000} 초)
      </div>
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
          {Math.floor(1 + fromIndex / paginationSize) !== 1 && (
          <Button onClick={() => pagination(1)}>처음
          </Button>
          )}
          {!!totalPapers && Array(paginationRadius).fill(Math.floor(1 + fromIndex / paginationSize))
            .map((_, index) => (_ - paginationRadius + index))
            .filter((pageNum) => pageNum > 0)
            .map((pageNum) => (<Button onClick={() => pagination(pageNum)}>{pageNum}</Button>))}
          <Button variant="secondary">{Math.floor(1 + fromIndex / paginationSize)}</Button>
          {!!totalPapers && Array(paginationRadius).fill(Math.floor(1 + fromIndex / paginationSize))
            .map((_, index) => (_ + index + 1))
            .filter((pageNum) => pageNum <= Math.floor(1 + totalPapers / paginationSize))
            .map((pageNum) => (<Button onClick={() => pagination(pageNum)}>{pageNum}</Button>))}
          {Math.floor(1 + fromIndex / paginationSize)
          !== Math.floor(1 + totalPapers / paginationSize) && (
          <Button onClick={() => pagination(Math.floor(1 + totalPapers / paginationSize))}>마지막
          </Button>
          )}
        </ButtonGroup>
      </div>

    </DefaultLayout>
  );
};

export default Search;
