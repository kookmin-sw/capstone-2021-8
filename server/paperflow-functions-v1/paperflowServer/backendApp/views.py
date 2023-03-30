from django.shortcuts import HttpResponse
from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
from django.conf import settings
from paperData.models import PaperInfo
from paperData.serializers import PaperInfoSerializer
from elasticsearch import Elasticsearch, RequestsHttpConnection

import json

HOST = settings.CONFIG['ELASTICSEARCH']['HOST']
USER = settings.CONFIG['ELASTICSEARCH']['USER']
PASSWORD = settings.CONFIG['ELASTICSEARCH']['PASSWORD']
ES = Elasticsearch(
    hosts=HOST,
    http_auth=(USER, PASSWORD),
    use_ssl=True,
    verify_certs=True,
    connection_class=RequestsHttpConnection
)


def index(request):
    return HttpResponse("Hello, world!")


def getJaccardSimilarity(corpus1, corpus2):
    tokens1, tokens2 = corpus1.split(), corpus2.split()
    set1, set2 = set(tokens1), set(tokens2)
    if len(set1 | set2):
        return len(set1 & set2) / len(set1 | set2)
    return 0


def getPastPaperFlow_(currentPaper, rem):
    if rem <= 0:
        return []

    refPaperIds = json.loads(currentPaper.reference_list)

    refPapers = PaperInfo.objects.filter(paper_id__in=refPaperIds)

    selectedPaperIndex, selectedSim = -1, 0

    for idx, refPaper in enumerate(refPapers):
        sim = getJaccardSimilarity(currentPaper.abstract, refPaper.abstract)

        if selectedPaperIndex == -1 or sim > selectedSim:
            selectedPaperIndex = idx
            selectedSim = sim

    if selectedPaperIndex == -1:
        return []

    return getPastPaperFlow_(refPapers[selectedPaperIndex], rem - 1) + [{'sim': selectedSim, **PaperInfoSerializer(refPapers[selectedPaperIndex]).data}]


def getFuturePaperFlow_(currentPaper, rem):
    if rem <= 0:
        return []

    citPaperIds = json.loads(currentPaper.citation_list)

    citPapers = PaperInfo.objects.filter(paper_id__in=citPaperIds)

    selectedPaperIndex, selectedSim = -1, 0

    for idx, refPaper in enumerate(citPapers):
        sim = getJaccardSimilarity(currentPaper.abstract, refPaper.abstract)

        if selectedPaperIndex == -1 or sim > selectedSim:
            selectedPaperIndex = idx
            selectedSim = sim

    if selectedPaperIndex == -1:
        return []

    return [{'sim': selectedSim, **PaperInfoSerializer(citPapers[selectedPaperIndex]).data}] + getFuturePaperFlow_(citPapers[selectedPaperIndex], rem - 1)


def getPaperFlow_(currentPaper):

    return getPastPaperFlow_(currentPaper, 5) + [PaperInfoSerializer(currentPaper).data] + getFuturePaperFlow_(currentPaper, 5)


@csrf_exempt
def getPaperFlow(request):
    paperId = request.GET.get('paperId', '')

    try:
        result = PaperInfo.objects.filter(paper_id=paperId)[0]
        resp = JsonResponse({'paperflow': getPaperFlow_(result)})
        resp['Access-Control-Allow-Origin'] = '*'

        return resp
    except Exception as err:
        return JsonResponse({'error': str(err)})


@csrf_exempt
def paper(request):
    paperId = request.GET.get('paperId', '')

    try:
        result = PaperInfo.objects.filter(paper_id=paperId)[0]
        serializer = PaperInfoSerializer(result)
        resp = JsonResponse({'paper': serializer.data})
        resp['Access-Control-Allow-Origin'] = '*'

        return resp
    except Exception as err:
        return JsonResponse({'error': str(err)})


@csrf_exempt
def searchPaper(request):
    searchKeyword = request.GET.get('searchKeyword', '')
    size = request.GET.get('size', 10)
    from_ = request.GET.get('from', 0)
    filters = request.GET.get('filters', None)
    if filters is None:
        filters = {
            'title': True,
            'abstract': True,
            'authors': False,
        }
    else:
        filters = json.loads(filters)

    fields = ['title', 'abstract', 'authors']

    docs = ES.search(
        index='paperinfo',
        body={
            "query": {
                "multi_match": {
                    "query": searchKeyword,
                    "fields": [field for field in fields if filters[field]]
                }
            }
        }, size=size, from_=from_)

    took = docs['took']
    total = docs['hits']['total']['value']

    papers = []
    for data in docs['hits']['hits']:
        papers.append(data.get('_source'))

    resp = JsonResponse({'papers': papers, 'total': total, 'took': took})
    resp['Access-Control-Allow-Origin'] = '*'
    return resp
