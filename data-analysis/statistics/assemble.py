import json



for year in ['17', '18', '19', '20']:
    for month in [str(month).zfill(2) for month in range(1, 13)]:
        with open('./result/new/{}{}.json'.format(year, month), 'r', encoding='utf8') as f:
            new = json.load(f)
        with open('./result/old/20{}_{}.json'.format(year, month), 'r', encoding='utf8') as f:
            old = json.load(f)
        temp = old[6]
        temp['title'] = 'citation이 가장 많은 논문'
        temp['type'] = 'Paper'
        new = [temp] + new
        with open('./result/new/{}{}.json'.format(year, month), 'w', encoding='utf8') as f:
            json.dump(new, f, indent=2, ensure_ascii = False)

for month in ['01', '02', '03']:
    with open('./result/new/21{}.json'.format(month), 'r', encoding='utf8') as f:
        new = json.load(f)
    with open('./result/old/2021_{}.json'.format(month), 'r', encoding='utf8') as f:
        old = json.load(f)
    temp = old[6]
    temp['title'] = 'citation이 가장 많은 논문'
    temp['type'] = 'Paper'
    new = [temp] + new
    with open('./result/new/21{}.json'.format(month), 'w', encoding='utf8') as f:
        json.dump(new, f, indent=2, ensure_ascii = False)