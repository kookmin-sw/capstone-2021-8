import React, { useState, useEffect } from 'react';
import {
  Button,
} from 'react-bootstrap';
import PaperListItem from '../PaperListItem';
import { fetchPaper } from '../../utils/utility';
import BlankListItem from '../BlankListItem';

const PaperList = ({
  paperIds,
}) => {
  const pageSize = 10;
  const [currentPageSize, setCurrentPageSize] = useState(pageSize);
  const [fetchedPapers, setFetchedPapers] = useState([]);

  const fetchPageSizePapers = async () => {
    setFetchedPapers([
      ...fetchedPapers,
      ...(await Promise.all(
        paperIds.slice(currentPageSize - pageSize, currentPageSize)
          .map((paperId) => (async () => ({
            paperId,
            fetchedPaper: await fetchPaper(paperId),
          }))()),
      )),
    ]);
  };

  useEffect(() => {
    fetchPageSizePapers();
  }, [currentPageSize]);

  return (
    <div style={{ marginBottom: '20px' }}>
      {
        fetchedPapers && fetchedPapers.map(({ paperId, fetchedPaper }) => {
          if (!fetchedPaper) {
            return (
              <div
                key={paperId}
                style={{ marginBottom: '10px' }}
              >
                <BlankListItem content="Computer Science 분야의 논문이 아닙니다!" />
              </div>
            );
          }

          const {
            title, date, authors, abstract, highlightKeywords, keywords,
          } = fetchedPaper;

          return (
            <div
              key={paperId}
              style={{ marginBottom: '10px' }}
            >
              <PaperListItem
                paperId={paperId}
                title={title}
                date={date}
                authors={authors.map((author) => author.name)}
                abstract={abstract}
                highlightKeywords={highlightKeywords}
                keywords={keywords}
                compact
              />
            </div>
          );
        })
      }
      {
        paperIds.length > currentPageSize && (
          <Button
            variant="outline-primary"
            size="md"
            onClick={() => {
              setCurrentPageSize(currentPageSize + pageSize);
            }}
            block
          >
            더보기{` (${Math.min(currentPageSize, paperIds.length)}/${paperIds.length})`}
          </Button>
        )
      }
    </div>
  );
};

export default PaperList;
