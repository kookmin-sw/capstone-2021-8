import React from 'react';
import PaperListItem from '../PaperListItem';

const PaperList = ({
  papers,
}) => (
  papers.map(({
    id, paperId, title, date, authors, abstract, highlightKeywords, keywords,
  }) => (
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
  ))
);

export default PaperList;
