from django.shortcuts import HttpResponse
from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt


def index(request):
    return HttpResponse("Hello, world!")


@csrf_exempt
def searchPaper(request):
    searchKeyword = request.GET.get('searchKeyword', '')
    print('searchKeyword', searchKeyword)
    papers = [
        {
            'title': 'Scaling of Magnetic Dissipation and Particle Acceleration in ABC Fields',
            'date': 'Nov 2021',
            'authors': ['Qiang Chen', 'Krzysztof Nalewajko', 'Bhupendra Mishra'],
            'abstract': 'Automatic abstractive summaries are found to often distort or fabricate facts in the article. This inconsistency between summary and original text has seriously',
            'highlightKeywords': ['Math.AC'],
            'keywords': ['Math.RA'],
        }
    ]
    resp = JsonResponse({'papers': papers})
    resp['Access-Control-Allow-Origin'] = '*'
    return resp
