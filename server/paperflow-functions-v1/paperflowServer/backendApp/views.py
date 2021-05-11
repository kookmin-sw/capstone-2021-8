from django.shortcuts import HttpResponse
from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
from django.conf import settings
from elasticsearch import Elasticsearch, RequestsHttpConnection


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


@csrf_exempt
def searchPaper(request):
    searchKeyword = request.GET.get('searchKeyword', '')

    docs = ES.search(
        index='paperinfo',
        body={
            "query": {
                "multi_match": {
                    "query": searchKeyword,
                    "fields": [
                        "title",
                        "abstract"
                    ]
                }
            }
        }, size=10, from_=0)

    papers = []
    for data in docs['hits']['hits']:
        papers.append(data.get('_source'))

    resp = JsonResponse({'papers': papers})
    resp['Access-Control-Allow-Origin'] = '*'
    return resp
