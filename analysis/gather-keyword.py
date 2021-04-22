import os
import csv
import json
from pattern.text.en import singularize
import nltk

base_path = "./papers"
save_base_path = './keywords'
file_list = os.listdir(base_path)


def filter_keywords(keywords):
    filtered_keywords = []
    for keyword in keywords:
        curr = singularize(keyword)
        tagged_curr = nltk.tag.pos_tag([curr])
        if tagged_curr[0][1] in ['RB', 'RBR', 'RBS', 'JJ', 'JJR', 'JJS']: # 형용사이거나 부사일 경우 (다른 키워드의 일부분일 가능성이 있음)
            if [i for i in keywords if curr in i and curr != i]: # 현재 키워드가 다른 키워드의 일부분일 때
                continue
        filtered_keywords.append(tagged_curr[0][0])
    return filtered_keywords


for f_name in file_list:
    f = open('{}/{}'.format(base_path, f_name), 'r', encoding='utf-8')
    csv_reader = csv.reader(f)
    header = next(csv_reader) # skip header

    keywords_frequency = {}
    keywords_relation = {}
    for line in csv_reader:
        paper_keywords = filter_keywords(line[-1].split('|'))

        for i in range(len(paper_keywords)):
            # 빈도 계산
            if paper_keywords[i] not in keywords_frequency:
                keywords_frequency[paper_keywords[i]] = 1
                keywords_relation[paper_keywords[i]] = {}
            else:
                keywords_frequency[paper_keywords[i]] += 1

            # 같은 paper에 위치한 keyword의 개수 저장
            for j in range(len(paper_keywords)):
                if i == j:
                    continue
                if paper_keywords[j] not in keywords_relation[paper_keywords[i]]:
                    keywords_relation[paper_keywords[i]][paper_keywords[j]] = 1
                else:
                    keywords_relation[paper_keywords[i]][paper_keywords[j]] += 1

    with open('{}/{}'.format(save_base_path, f_name).replace('.csv', '-freq.json'), 'w') as f:
        json.dump(keywords_frequency, f)
    with open('{}/{}'.format(save_base_path, f_name).replace('.csv', '-relation.json'), 'w') as f:
        json.dump(keywords_relation, f)
    print(f_name, ' finished')