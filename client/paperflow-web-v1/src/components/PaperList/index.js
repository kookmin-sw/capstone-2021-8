import React, { useState } from 'react';
import {
  Button,
} from 'react-bootstrap';
import PaperListItem from '../PaperListItem';

const PaperList = ({
  papers,
}) => {
  const pageSize = 10;
  const [currentPageSize, setCurrentPageSize] = useState(pageSize);

  return (
    <div style={{ marginBottom: '20px' }}>
      {
        papers.slice(0, currentPageSize).map(({
          id, paperId, title, date, authors, abstract, highlightKeywords, keywords,
        }) => (
          <div style={{ marginBottom: '10px' }}>
            <PaperListItem
              key={id}
              paperId={paperId}
              title={title}
              date={date}
              authors={authors}
              abstract={abstract}
              highlightKeywords={highlightKeywords}
              keywords={keywords}
              compact
            />
          </div>
        ))
      }
      {
        papers.length > currentPageSize && (
          <Button variant="outline-primary" size="md" onClick={() => setCurrentPageSize(currentPageSize + pageSize)} block>
            더보기{` (${Math.min(currentPageSize, papers.length)}/${papers.length})`}
          </Button>
        )
      }
    </div>
  );
};

export default PaperList;
