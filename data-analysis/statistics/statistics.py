import csv
import json
import operator


def get_files(year, month):
    f = open('./papers/{}{}.csv'.format(year, month), 'r', encoding='UTF-8')
    csv_reader = csv.reader(f)
    header = next(csv_reader) # skip header

    ret = []
    for line in csv_reader:
        ret.append(line)
    return ret


def stat_1(year, month):  # 논문의 개수 가져오는 함수
    data_nums = [
        ('1701', 2036), ('1702', 2209), ('1703', 2714), ('1704', 2284), ('1705', 2797),
        ('1706', 2470), ('1707', 2637), ('1708', 2487), ('1709', 2742), ('1710', 2637),
        ('1711', 3017), ('1712', 2401), ('1801', 2578), ('1802', 3100), ('1803', 3221),
        ('1804', 3424), ('1805', 3912), ('1806', 3382), ('1807', 3533), ('1808', 3048),
        ('1809', 3403), ('1810', 3927), ('1811', 4153), ('1812', 3213), ('1901', 3474),
        ('1902', 3588), ('1903', 3802), ('1904', 4744), ('1905', 4937), ('1906', 4704),
        ('1907', 4867), ('1908', 4213), ('1909', 5115), ('1910', 5402), ('1911', 5017),
        ('1912', 4556), ('2001', 4228), ('2002', 5089), ('2003', 5438), ('2004', 5789),
        ('2005', 5370), ('2006', 6157), ('2007', 6078), ('2008', 5272), ('2009', 5361),
        ('2010', 6307), ('2011', 5537), ('2012', 5743), ('2101', 4610), ('2102', 5308),
        ('2103', 6523), ('2104', 6069)
    ]
    temp = {}
    for key, value in data_nums:
        temp[key] = value

    ret = {
        'title': '최근 투고된 논문 개수 변화',
        'type': 'VertBar1D',
        'config': {
            'index': 'primary subject',
            'key': 'frequency',
            'color': 'blue'
        }
    }
    ret['data'] = []

    for i in range(4):
        ret['data'].append({
            'primary subject': '20{}-{}'.format(year, month),
            'frequency': temp['{}{}'.format(year, month)]
        })
        if year == '17' and month == '01':
            break
        if month == '01':
            year = str(int(year) - 1)
            month = '12'
        else:
            month = str(int(month) - 1).zfill(2)
    ret['data'].reverse()
    return ret


def stat_2(data):
    ret = {
        'title': 'Primary Subject 빈도',
        'type': 'Pie'
    }
    ret['data'] = []

    results = {}

    for paper in data:
        temp_primary = paper[3]
        if temp_primary not in results:
            results[temp_primary] = 1
        else:
            results[temp_primary] += 1
    results = sorted(results.items(), key=operator.itemgetter(1), reverse=True)[:10]

    for key, value in results:
        ret['data'].append({
            'id': key,
            'value': value
        })

    return ret


def stat_3(data):
    ret = {
        'title': 'Secondary Subject 빈도',
        'type': 'Pie'
    }
    ret['data'] = []

    secondary_results = {}

    for paper in data:
        if paper[5] == '':
            continue
        temp_secondaries = paper[5].split(',')
        for temp_secondary in temp_secondaries:
            if temp_secondary not in secondary_results:
                secondary_results[temp_secondary] = 1
            else:
                secondary_results[temp_secondary] += 1

    result = sorted(secondary_results.items(), key=operator.itemgetter(1), reverse=True)[:10]

    for key, value in result:
        ret['data'].append({
            'id': key,
            'value': value
        })

    return ret


def stat_4(data):
    ret = {
        'title': 'Primary - Secondary 연구 분야 쌍 빈도',
        "type": "VertBar2D",
        "config": {
            "index": "primary_subject",
            "key": [],
            "axis": "frequency"
        },
    }
    ret['data'] = []

    primary_results = {}
    secondary_results = {}

    for paper in data:
        if paper[5] == '':
            continue
        temp_primary = paper[3].split('(')[-1].replace(')', '')
        temp_secondaries = [temp_secondary.split('(')[-1].replace(')', '') for temp_secondary in paper[5].split(',')]
        if temp_primary not in primary_results:
            primary_results[temp_primary] = 1
        else:
            primary_results[temp_primary] += 1
        if temp_primary not in secondary_results:
            secondary_results[temp_primary] = {}
        for temp_secondary in temp_secondaries:
            if temp_secondary not in secondary_results[temp_primary]:
                secondary_results[temp_primary][temp_secondary] = 1
            else:
                secondary_results[temp_primary][temp_secondary] += 1

    primary_results = sorted(primary_results.items(), key=operator.itemgetter(1), reverse=True)
    top_5_primaries = [key for key, _ in primary_results[:5]]

    for top_primary in top_5_primaries:
        temp_data = {}
        temp_data['primary_subject'] = top_primary
        temp_secondaries = sorted(secondary_results[top_primary].items(), key=operator.itemgetter(1), reverse=True)[:5]
        for temp_secondary_key, temp_secondary_value in temp_secondaries:
            temp_data[temp_secondary_key] = temp_secondary_value
            if temp_secondary_key not in ret['config']['key']:
                ret['config']['key'].append(temp_secondary_key)
        ret['data'].append(temp_data)

    return ret


def stat_5(data):
    ret = {
        'title': 'CS와 같이 연구된 분야',
        'type': 'VertBar1D',
        "config": {
            "index": "subject",
            "key": "frequency",
            "color": "blue"
        },
    }
    ret['data'] = []

    secondary_results = {}

    for paper in data:
        if paper[5] == '':
            continue
        temp_secondaries = [temp_secondary.split('(')[-1].replace(')', '') for temp_secondary in paper[5].split(',')]
        for temp_secondary in temp_secondaries:
            if temp_secondary.startswith('cs'):
                continue
            if temp_secondary not in secondary_results:
                secondary_results[temp_secondary] = 1
            else:
                secondary_results[temp_secondary] += 1

    # exception
    if 'Distributed' in secondary_results:
        secondary_results['Distributed Parallel'] = secondary_results['Distributed']
        del (secondary_results['Distributed'])
        del (secondary_results[' Parallel'])

    result = sorted(secondary_results.items(), key=operator.itemgetter(1), reverse=True)[:10]

    for key, value in result:
        ret['data'].append({
            'subject': key,
            'frequency': value
        })

    return ret


def stat_6(data):
    ret = {
        'title': '가장 많이 등장한 keyword',
        "type": "VertBar1D",
        "config": {"index": "keyword", "key": "frequency", "color": "red"},
    }
    ret['data'] = []

    keywords = {}

    for paper in data:
        if paper[7] == '':
            continue
        temp_keywords = paper[7].split('|')
        for keyword in temp_keywords:
            if keyword not in keywords:
                keywords[keyword] = 1
            else:
                keywords[keyword] += 1

    keywords = sorted(keywords.items(), key=operator.itemgetter(1), reverse=True)[:15]

    for keyword, frequency in keywords:
        if keyword in ['learning', 'networks', 'data', 'detection', 'models', 'neural network']:
            continue
        ret['data'].append({
            'keyword': keyword,
            'frequency': frequency
        })

    return ret


for year in ['17', '18', '19', '20']:
    for month in [str(month).zfill(2) for month in range(1, 13)]:
        curr_data = get_files(year, month)
        ret = [
            stat_1(year, month),
            stat_2(curr_data),
            stat_3(curr_data),
            stat_4(curr_data),
            stat_5(curr_data),
            stat_6(curr_data),
        ]
        with open('./result/new/{}{}.json'.format(year, month), 'w', encoding='UTF-8') as f:
            json.dump(ret, f, indent=2, ensure_ascii = False)

for month in ['01', '02', '03', '04']:
    curr_data = get_files('21', month)
    ret = [
        stat_1('21', month),
        stat_2(curr_data),
        stat_3(curr_data),
        stat_4(curr_data),
        stat_5(curr_data),
        stat_6(curr_data),
    ]
    with open('./result/new/21{}.json'.format(month), 'w', encoding='UTF-8') as f:
        json.dump(ret, f, indent=2, ensure_ascii = False)