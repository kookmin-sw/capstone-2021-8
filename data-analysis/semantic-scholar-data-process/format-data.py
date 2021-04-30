import json

# directory path where semantic scholar data stored
PATH = '/Volumes/PSSD/sementicscholar_data/'
# directory path to store json formatted data
PATH_TO = '/Volumes/PSSD/sementicscholar_data_processed/'

START_IDX = 0
NUM = 6000

cnt = 0
# tot = 191281586
for i in range(START_IDX, NUM):
    allPapers = []

    filename = PATH + 's2-corpus-{:03d}'.format(i)
    print(filename)
    with open(filename, 'r') as f:
        papers = f.read()
        f.close()

    paperJson = ''
    for idx, paper in enumerate(papers.splitlines()):
        paperJson += paper
        try:
            paperObject = json.loads(paperJson)
            paperJson = ''
            allPapers.append(paperObject)
        except:
            pass

    cnt += len(allPapers)

    with open('{}corpus-{:04d}'.format(PATH_TO, i), 'w') as f:
        json.dump(allPapers, f)

    print(i, cnt)
