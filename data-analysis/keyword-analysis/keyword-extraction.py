import csv
import pandas as pd
import yake

def set_yake_keyword_extractor():
    language = "en"
    max_ngram_size = 3
    deduplication_threshold = 0.9
    numOfKeywords = 7
    kw_extractor = yake.KeywordExtractor(lan=language, n=max_ngram_size, dedupLim=deduplication_threshold,
                                                top=numOfKeywords, features=None)
    return kw_extractor

def find_keywords(title, kw_extractor):
    keywords = kw_extractor.extract_keywords(title)
    return [keyword for keyword in keywords]


kw_extractor = set_yake_keyword_extractor()
papers = {}
columns = ['arxiv_num', 'authors', 'pdf_url', 'primary_subject',
           'publication_date', 'secondary_subjects', 'title', 'keywords']

for f_name in ['2017', '2018', '2019', '2020', '2021']:
    f = open('{}.csv'.format(f_name), 'r', encoding='utf-8')
    csv_reader = csv.reader(f)
    next(csv_reader) # skip header
    papers = {}
    i = 0
    for line in csv_reader:
        keywords = [keyword[0] for keyword in kw_extractor.extract_keywords(line[-1])]
        line = line[1:]
        line.pop(-3)
        line.append('|'.join(keywords))

        if line[-4] in papers:
            papers[line[-4]].append(line)
        else:
            papers[line[-4]] = [line]

        # for checking
        i += 1
        if i % 10000 == 0:
            print(i, 'finished')
    print(f_name, ' finished')
    f.close()

    for publication_data, paper_list in papers.items():
        df = pd.DataFrame(paper_list, columns=columns)
        df.to_csv('./papers/{}.csv'.format(publication_data), index=False)