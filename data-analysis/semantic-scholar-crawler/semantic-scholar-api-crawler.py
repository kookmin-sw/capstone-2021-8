import semanticscholar as sch
import csv
import json
import time

# arxiv csv file path
ARXIV_CSV_PATH = './arxiv_csv/2020.csv'
# file path to save retrieved paper data
HTML_PATH = './papers1025.json'


def getPaper(arxivNum):
    paper = sch.paper(arxivNum, timeout=2)
    return paper


# abstract, arxiv_num, authors, pdf_url, primary_subject, publication_date, save_path, secondary_subjects, title
with open(ARXIV_CSV_PATH) as csvfile:
    arxivCSV = csv.reader(csvfile)
    arxivCSV = list(arxivCSV)
    csvfile.close()

# with open('./papers.json', 'r') as f:
#  papers = json.load(f)

columns = arxivCSV[0]
arxivCSV = arxivCSV[1:]
arxivCSV = arxivCSV[1025]
tot = len(arxivCSV)
papers = []
try:
    for idx, row in enumerate(arxivCSV):
        paper = None
        arxivNum = row[1]
        while not paper:
            paper = getPaper(arxivNum)
            if not paper:
                print('sleep for 10 secs')
                time.sleep(10)
        papers.append(paper)
        #papers[idx] = paper
        print(idx, tot, arxivNum, bool(paper))
except Exception as ex:
    print(ex)

with open(HTML_PATH, 'w') as f:
    json.dump(papers, f)
