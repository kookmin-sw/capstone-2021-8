from selenium import webdriver
import csv
import json
import time

# arxiv csv file path
ARXIV_CSV_PATH = './arxiv_csv/2020.csv'
# file path to save retrieved HTMLs
HTML_PATH = './htmls.json'
API_URI = 'https://api.semanticscholar.org/'
driver = webdriver.Chrome("./chromedriver")


def getHTML(arxivNum):
    driver.get("{}{}".format(API_URI, arxivNum))
    url = driver.current_url
    driver.get("{}?citedPapersLimit=99".format(url))
    time.sleep(1)
    html = driver.page_source
    return url, html


# abstract, arxiv_num, authors, pdf_url, primary_subject, publication_date, save_path, secondary_subjects, title
with open(ARXIV_CSV_PATH) as csvfile:
    arxivCSV = csv.reader(csvfile)
    arxivCSV = list(arxivCSV)
    csvfile.close()

columns = arxivCSV[0]
arxivCSV = arxivCSV[1:]
tot = len(arxivCSV)
htmls = []
try:
    for idx, row in enumerate(arxivCSV):
        arxivNum = row[1]
        url, html = getHTML(arxivNum)
        htmls.append({
            'arxivNum': arxivNum,
            'html': html,
            'url': url,
        })
        print(idx, tot, arxivNum)
except:
    pass

driver.close()

with open(HTML_PATH, 'w') as f:
    json.dump(htmls, f)
