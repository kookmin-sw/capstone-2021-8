from django.urls import path
from searchApp import views

urlpatterns = [
    path('', views.SearchView.as_view())
]