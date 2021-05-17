import React from 'react';
import CompactPaperListItem from './CompactPaperListItem';
import DetailPaperListItem from './DetailPaperListItem';

const PaperListItem = ({
  paperId, title, date, authors, abstract, highlightKeywords, keywords,
  compact = false, abstractMaxLength = 300,
}) => (compact
  ? (
    <CompactPaperListItem
      paperId={paperId}
      title={title}
      date={date}
      authors={authors}
      abstract={abstract}
      highlightKeywords={highlightKeywords}
      keywords={keywords}
      abstractMaxLength={abstractMaxLength}
    />
  )
  : (
    <DetailPaperListItem
      paperId={paperId}
      title={title}
      date={date}
      authors={authors}
      abstract={abstract}
      highlightKeywords={highlightKeywords}
      keywords={keywords}
      abstractMaxLength={abstractMaxLength}
    />
  ));

export default PaperListItem;
