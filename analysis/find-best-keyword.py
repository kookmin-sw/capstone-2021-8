import json


def get_sorted_dict(dict):
    return sorted(dict.items(), key=lambda x: x[1], reverse=True)

def get_top_n(dict, keyword_info, max_freq, n):
    return [i[0] for i in get_sorted_dict(dict) if keyword_info[i[0]][1] < max_freq][:n]

def get_keyword_info(dict):
    keyword_info = {}
    keyword_by_depth = [[], [], [], []]
    sorted_dict = get_sorted_dict(dict)
    for keyword, frequency in sorted_dict:
        if frequency >= 50:
            keyword_info[keyword] = (0, frequency)
            keyword_by_depth[0].append(keyword)
        elif frequency >= 10:
            keyword_info[keyword] = (1, frequency)
            keyword_by_depth[1].append(keyword)
        elif frequency >= 5:
            keyword_info[keyword] = (2, frequency)
            keyword_by_depth[2].append(keyword)
        else:
            keyword_info[keyword] = (3, frequency)
            keyword_by_depth[3].append(keyword)
    return keyword_info, keyword_by_depth


for year in ['17', '18', '19', '20']:
    for month in [str(i).zfill(2) for i in range(1, 13)]:
        with open('./keywords/{}{}-freq.json'.format(year, month), 'r') as f:
            frequencies = json.load(f)
        with open('./keywords/{}{}-relation.json'.format(year, month), 'r') as f:
            relations = json.load(f)

        # output data
        top_keywords = [[], [], [], []] # 키워드와 depth 저장하는 그래프, json 형식
        top_keywords_relations = [] # 키워드의 관계

        # config
        keyword_info, keyword_by_depth = get_keyword_info(frequencies)
        n = 5

        for keyword in keyword_by_depth[0]:
            top_keywords[keyword_info[keyword][0]].append(keyword)
            related_keywords = get_top_n(relations[keyword], keyword_info, keyword_info[keyword][1], n)
            for sub_keyword in related_keywords:
                if sub_keyword not in top_keywords[keyword_info[sub_keyword][0]]:
                    top_keywords[keyword_info[sub_keyword][0]].append(sub_keyword)
                top_keywords_relations.append({
                    'source': keyword,
                    'target': sub_keyword,
                    'depth': [0, keyword_info[sub_keyword][0]]
                })

        for keyword in keyword_by_depth[1]:
            top_keywords[keyword_info[keyword][0]].append(keyword)
            related_keywords = get_top_n(relations[keyword], keyword_info, keyword_info[keyword][1], n)
            for sub_keyword in related_keywords:
                if sub_keyword not in top_keywords[keyword_info[sub_keyword][0]]:
                    top_keywords[keyword_info[sub_keyword][0]].append(sub_keyword)
                top_keywords_relations.append({
                    'source': keyword,
                    'target': sub_keyword,
                    'depth': [1, keyword_info[sub_keyword][0]]
                })

        result = {
            'node': top_keywords,
            'link': top_keywords_relations,
        }
        with open('./results/{}{}.json'.format(year, month), 'w') as f:
            json.dump(result, f)

        print(len(top_keywords[0]) + len(top_keywords[1]) + len(top_keywords[2]) + len(top_keywords[3]))
