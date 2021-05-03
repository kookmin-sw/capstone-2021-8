import django
import csv
import os
import sys

os.environ.setdefault("DJANGO_SETTINGS_MODULE", 'paperflowServer.settings') 
django.setup()

from paperData.models import PaperInfo

PAPERINFO_CSV_PATH = 'C:\\Users\\tykim\\OneDrive\\바탕 화면\\KTY\\국민대학교\\국민대 과제 및 공부 자료\\2021-1학기\\캡스톤프로젝트\\Code\\semantic_scholar\\paper'

def insert_paperinfo():
    file_list = os.listdir(PAPERINFO_CSV_PATH)
    max_int = sys.maxsize
    for i in range(len(file_list)):    
        file_loc = PAPERINFO_CSV_PATH + "\\" + file_list[i]
        with open(file_loc, newline='', encoding='utf8') as csvfile:
            data_reader = csv.DictReader(csvfile)
            
            while True:
                try:
                    csv.field_size_limit(max_int)
                    break
                except OverflowError:
                    max_int = int(max_int/10)

            for row in data_reader:
                PaperInfo.objects.create(
                    paper_id = row['id'],
                    title= row['title'], 
                    abstract=row['paperAbstract'], 
                    pdf_urls=row['pdfUrls'], 
                    authors=row['authors'],
                    citation_list=row['inCitations'],
                    reference_list=row['outCitations'],
                    field_list=row['fieldsOfStudy'],
                    publication_year=row['year'], 
                    venue=row['venue'],
                    journal_name=row['journalName'],
                    journal_volume=row['journalVolume'],
                    journal_pages=row['journalPages'],
                    doi=row['doi'],
                    mag_id=row['magId'],
                )
        print("{} Complete".format(file_list[i]))
    print('PaperInfo DATA UPLOADED SUCCESSFULY!')    

insert_paperinfo()
