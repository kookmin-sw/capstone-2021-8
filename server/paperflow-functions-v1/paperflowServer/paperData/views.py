from rest_framework import status
from rest_framework.views import APIView
from rest_framework.response import Response

from django.shortcuts import render
from django.http import Http404
from .models import PaperInfo


class PaperInfoView(APIView):
    def get(request, paper_id):
        try:
            result = PaperInfo.objects.filter(paper_id=paper_id)[0]
            result_info = """paper_id: {0};
            title: {1};
            abstract: {2};
            pdf_urls: {3};
            authors: {4};
            citation_list: {5};
            reference_list: {6};
            field_list: {7};
            publication_year: {8};
            venue: {9};
            journal_name: {10};
            journal_volume: {11};
            journal_pages: {12};
            doi: {13};
            mag_id: {14};""".format(result.paper_id,
                                                            result.title,
                                                            result.abstract,
                                                            result.pdf_urls,
                                                            result.authors,
                                                            result.citation_list,
                                                            result.reference_list,
                                                            result.field_list,
                                                            result.publication_year,
                                                            result.venue,
                                                            result.journal_name,
                                                            result.journal_volume,
                                                            result.journal_pages,
                                                            result.doi,
                                                            result.mag_id)
        except IndexError:
            raise Http404("Paper does not exist")
        except PaperInfo.DoesNotExist:
            raise Http404("Paper does not exist")
        return render(request, 'paperData/index.html', {'welcome_text': result_info})

    
