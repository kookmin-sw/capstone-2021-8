from django.urls import path

from . import views

urlpatterns = [
    path('paper', views.paper, name='paper'),
    path('paper-flow', views.getPaperFlow, name='paper'),
    path('search-paper', views.searchPaper, name='searchPaper'),
    path('', views.index, name='index'),
]
