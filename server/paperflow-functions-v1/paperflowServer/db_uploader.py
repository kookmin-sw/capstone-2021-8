import django
import csv
import os

os.environ.setdefault("DJANGO_SETTINGS_MODULE", 'paperflowServer.settings') 
django.setup()

from arxiv.models import PaperInfo, AbstractInfo, AuthorsInfo, ThemeInfo

PAPERINFO_CSV_PATH = 'C:\\Users\\tykim\\OneDrive\\바탕 화면\\KTY\\국민대학교\\국민대 과제 및 공부 자료\\2021-1학기\\캡스톤프로젝트\\Code\\arxiv\\Paper Info.csv'
ABSTRACTINFO_CSV_PATH = 'C:\\Users\\tykim\\OneDrive\\바탕 화면\\KTY\\국민대학교\\국민대 과제 및 공부 자료\\2021-1학기\\캡스톤프로젝트\\Code\\arxiv\\Abstract Info.csv'
AUTHORSINFO_CSV_PATH = 'C:\\Users\\tykim\\OneDrive\\바탕 화면\\KTY\\국민대학교\\국민대 과제 및 공부 자료\\2021-1학기\\캡스톤프로젝트\\Code\\arxiv\\Authors Info.csv'
THEMEINFO_CSV_PATH = 'C:\\Users\\tykim\\OneDrive\\바탕 화면\\KTY\\국민대학교\\국민대 과제 및 공부 자료\\2021-1학기\\캡스톤프로젝트\\Code\\arxiv\\Theme Info.csv'

def insert_paperinfo():    
    with open(PAPERINFO_CSV_PATH, newline='', encoding='utf8') as csvfile:
        data_reader = csv.DictReader(csvfile)
        for row in data_reader:
            print(row['\ufeffID'])
            PaperInfo.objects.create(
                paperID = row['\ufeffID'], title= row['Title'], arxiv_num=row['Arxiv_num'], pdf_url=row['PDF_URL'], publicationYear=row['Publication_year'], publicationMonth=row['Publication_month']
            )
    print('PaperInfo DATA UPLOADED SUCCESSFULY!')    

def insert_abstractinfo():    
    with open(ABSTRACTINFO_CSV_PATH, newline='', encoding='utf8') as csvfile:
        data_reader = csv.DictReader(csvfile)
        for row in data_reader:
            print(row['\ufeffID'])
            AbstractInfo.objects.create(paperID=PaperInfo.objects.get(paperID=row['\ufeffID']), abstract=row['Abstract'])
    print('Abstract DATA UPLOADED SUCCESSFULY!')    

def insert_authorsinfo():    
    with open(AUTHORSINFO_CSV_PATH, newline='', encoding='utf8') as csvfile:
        data_reader = csv.DictReader(csvfile)
        for row in data_reader:
            print(row['\ufeffID'])
            AuthorsInfo.objects.create(paperID=PaperInfo.objects.get(paperID=row['\ufeffID']), author=row['Author'])
        print('Author DATA UPLOADED SUCCESSFULY!')

def insert_themeinfo():
    with open(THEMEINFO_CSV_PATH, newline='', encoding='utf8') as csvfile:
        data_reader = csv.DictReader(csvfile)
        for row in data_reader:
            print(row['\ufeffID'])
            ThemeInfo.objects.create(paperID=PaperInfo.objects.get(paperID=row['\ufeffID']), theme=row['Theme'])
        print('Theme DATA UPLOADED SUCCESSFULY!')


insert_paperinfo()
insert_abstractinfo()
insert_authorsinfo()
insert_themeinfo()
