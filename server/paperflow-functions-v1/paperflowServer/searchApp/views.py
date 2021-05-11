from elasticsearch import Elasticsearch

from django.views import View
from django.http import JsonResponse

# Create your views here.

class SearchView(View):
    def get(self, request):
        es = Elasticsearch()

        search_word = request.GET.get('search')

        if not search_word:
            return JsonResponse({'message':'INVALID_REQUEST'}, status=400)

        papers = es.search(index='paperinfo',
                         doc_type='_doc',
                         body={
                             "query": {
                                 "multi_match": {
                                     "query": search_word,
                                     "fields": ["paper_id", "title", "abstract", "pdf_urls","authors","citation_list",
                                     "reference_list", "field_list", "publication_year", "venue", "journal_name",
                                     "journal_volume", "journal_pages", "doi", "mag_id"]
                                 }
                             }
                         })

        paper_list = []
        for paper in papers['hits']['hits']:
            paper_list.append(paper.get('_source'))

        return JsonResponse({'data': paper_list}, status=200)
