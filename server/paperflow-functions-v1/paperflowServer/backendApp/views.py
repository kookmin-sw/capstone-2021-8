from django.shortcuts import HttpResponse
from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
from django.conf import settings
from paperData.models import PaperInfo
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
def paper(request):
    paperId = request.GET.get('paperId', '')

    try:
        result = PaperInfo.objects.filter(paper_id=paperId)[0]
        paperInfo = {
            "paperId": result.paper_id,
            "title": result.title,
            "abstract": result.abstract,
            "pdf_urls": result.pdf_urls,
            "authors": result.authors,
            "citation_list": result.citation_list,
            "reference_list": result.reference_list,
            "field_list": result.field_list,
            "publication_year": result.publication_year,
            "venue": result.venue,
            "journal_name": result.journal_name,
            "journal_volume": result.journal_volume,
            "journal_pages": result.journal_pages,
            "doi": result.doi,
            "mag_id": result.mag_id,
        }
        resp = JsonResponse({'paper': paperInfo})
        resp['Access-Control-Allow-Origin'] = '*'

        return resp
    except Exception as err:
        return JsonResponse({'error': str(err)})


@csrf_exempt
def searchPaper(request):
    searchKeyword = request.GET.get('searchKeyword', '')
    from_ = request.GET.get('from', 0)

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
        }, size=10, from_=from_)

    total = docs['hits']['total']['value']

    papers = []
    for data in docs['hits']['hits']:
        papers.append(data.get('_source'))

    resp = JsonResponse({'papers': papers, 'total': total})
    resp['Access-Control-Allow-Origin'] = '*'
    return resp
