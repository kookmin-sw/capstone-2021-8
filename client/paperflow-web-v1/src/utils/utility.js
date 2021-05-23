import axios from 'axios';
import config from '../config';

export const parseQueryString = () => {
  const queryString = window.location.search.trim();

  const queryObject = {};
  // Return empty obejct, when do not have querystring
  if (queryString === '') return queryObject;

  queryString
    .split('?')[1]
    .split('&')
    .forEach((item) => {
      const [key, value] = item.split('=');
      queryObject[key] = decodeURI(value);
    });

  return queryObject;
};

export const fetchPaper = async (paperId) => {
  const { data } = await axios.get(`${config.backendEndPoint}/backend/paper`, {
    params: { paperId },
  });

  if (data.error) {
    return null;
  }

  const {
    title,
    abstract,
    pdf_urls: pdfUrls,
    authors,
    citation_list: citationList,
    reference_list: referenceList,
    field_list: fieldList,
    publication_year: publicationYear,
    venue,
    journal_name: journalName,
    journal_volume: journalVolume,
    journal_pages: journalPages,
    doi,
    mag_id: magId,
  } = data.paper;

  return {
    paperId,
    title,
    abstract,
    pdfUrls: JSON.parse(pdfUrls),
    authors: JSON.parse(authors),
    citationList: JSON.parse(citationList),
    referenceList: JSON.parse(referenceList),
    fieldList: JSON.parse(fieldList),
    publicationYear,
    venue,
    journalName,
    journalVolume,
    journalPages,
    doi,
    magId,
  };
};
