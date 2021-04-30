from django.urls import path

from . import views

urlpatterns = [
    path('search-paper', views.searchPaper, name='searchPaper'),
    path('', views.index, name='index'),
]
