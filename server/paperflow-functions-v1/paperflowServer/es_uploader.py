from elasticsearch import Elasticsearch, helpers
import elasticsearch
import sys, json
import os

es = Elasticsearch([{'host':'localhost','port':'9200'}])

PAPERINFO_CSV_PATH = "C:\\Users\\tykim\\OneDrive\\바탕 화면\\semanticscholar_json"

file_list = os.listdir(PAPERINFO_CSV_PATH)
idx = 1

for i in range(len(file_list)):
    file_loc = PAPERINFO_CSV_PATH + "\\" + file_list[i]
    print(file_list[i])
    with open(file_loc, 'r', encoding='utf8') as infile:
        infile = infile.read().splitlines()
        tmp = list(enumerate(infile))
        for j in range(len(tmp)):
            docs = []
            if j == len(tmp) // 2:
                break
            if j % 2 == 1:
                docs.append({
                    '_index': 'paperinfo',
                    '_type': '_doc',
                    '_id': '{}'.format(idx),
                    '_source':tmp[j][1]
                })
            idx += 1
            helpers.bulk(es,docs)
    print("{} Complete".format(file_list[i]))
    
